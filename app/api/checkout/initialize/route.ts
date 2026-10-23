import { NextResponse } from 'next/server';
// import { OrderStatus, PaymentStatus, PaymentProvider, FulfillmentMethod } from '../../../../app/generated/prisma';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { getCurrentUser } from '../../services/auth/guards';
import { checkoutInitializeSchema } from '@/app/lib/validations/checkout';
import { prisma } from '@/app/lib/prisma';
import { FulfillmentMethod, OrderStatus, PaymentProvider, PaymentStatus } from '@/app/generated/prisma/enums';
import { initializePaystackTransaction } from '@/app/lib/integrations/paystack';

const GUEST_CART_COOKIE = 'fiymah_guest_cart';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const cookieStore = await cookies();
    const body = await request.json();

    const result = checkoutInitializeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const input = result.data;

    // 1. Locate active cart for user or guest
    let cart = null;
    if (user) {
      cart = await prisma.cart.findFirst({
        where: { userId: user.id, status: 'ACTIVE' },
        include: { items: { include: { product: true, variant: true } } },
      });
    } else {
      const guestToken = cookieStore.get(GUEST_CART_COOKIE)?.value;
      const guestTokenHash = guestToken ? crypto.createHash('sha256').update(guestToken).digest('hex') : null;
      if (guestTokenHash) {
        cart = await prisma.cart.findUnique({
          where: { guestTokenHash },
          include: { items: { include: { product: true, variant: true } } },
        });
      }
    }

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty or not found' }, { status: 400 });
    }

    // 2. Server-side price calculation & item validation
    let subtotal = 0;
    let customizationTotal = 0;
    const orderItemsData: any[] = [];

    for (const item of cart.items) {
      if (item.product.status !== 'ACTIVE') {
        return NextResponse.json({ error: `Product "${item.product.name}" is no longer active.` }, { status: 400 });
      }

      let baseUnitPrice = Number(item.product.basePrice || 0);
      let variantAdj = 0;

      if (item.variantId) {
        if (!item.variant || !item.variant.isAvailable) {
          return NextResponse.json({ error: `Selected variant for "${item.product.name}" is unavailable.` }, { status: 400 });
        }
        variantAdj = Number(item.variant.priceAdjustment || 0);
      }

      const unitPrice = baseUnitPrice + variantAdj;
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      orderItemsData.push({
        productId: item.productId,
        variantId: item.variantId,
        measurementProfileId: item.measurementProfileId,
        productName: item.product.name,
        productSku: item.variant?.sku || item.product.sku,
        productImageUrl: item.product.shortDescription, // or fetch primary media
        variantSnapshot: item.variant ? { name: item.variant.name, attributes: item.variant.attributes } : null,
        customizationSnapshot: item.selectedOptions,
        measurementSnapshot: item.customMeasurements,
        descriptionSnapshot: item.product.shortDescription,
        quantity: item.quantity,
        unitPrice,
        customizationFee: 0,
        lineTotal,
      });
    }

    const shippingTotal = input.fulfillmentMethod === FulfillmentMethod.DELIVERY ? 5000.00 : 0.00; // Flat or configured rate
    const grandTotal = subtotal + customizationTotal + shippingTotal;
    const orderNumber = `FYM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const paymentReference = `PAY-${orderNumber}`;

    // 3. Database Transaction: Create Order, Payment record, and status event
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId: user ? user.id : null,
          cartId: cart.id,
          email: input.email,
          phone: input.phone,
          customerName: input.customerName,
          status: OrderStatus.PENDING_PAYMENT,
          paymentStatus: PaymentStatus.PENDING,
          currency: 'NGN',
          subtotal,
          customizationTotal,
          discountTotal: 0,
          shippingTotal,
          grandTotal,
          fulfillmentMethod: input.fulfillmentMethod,
          shippingAddress: input.shippingAddressSnapshot || "",
          customerNotes: input.customerNotes,
          items: {
            create: orderItemsData,
          },
          statusEvents: {
            create: {
              toStatus: OrderStatus.PENDING_PAYMENT,
              note: 'Order initialized and awaiting payment.',
              actorId: user ? user.id : null,
            },
          },
        },
      });

      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          provider: PaymentProvider.PAYSTACK,
          providerReference: paymentReference,
          status: PaymentStatus.PENDING,
          amount: grandTotal,
          currency: 'NGN',
        },
      });

      return newOrder;
    });

    // 4. Initialize Paystack Transaction (convert grandTotal NGN to integer kobo)
    const amountInKobo = Math.round(grandTotal * 100);
    const callbackUrl = `${process.env.APP_URL || 'http://localhost:3000'}/checkout/confirmation?order=${order.orderNumber}`;

    const paystackResponse = await initializePaystackTransaction({
      email: input.email,
      amountInKobo,
      reference: paymentReference,
      callbackUrl,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });

    return NextResponse.json({
      message: 'Checkout initialized successfully',
      orderNumber: order.orderNumber,
      authorizationUrl: paystackResponse.authorization_url,
      reference: paymentReference,
    });
  } catch (error) {
    console.error('Checkout initialization error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}