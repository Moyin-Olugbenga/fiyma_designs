import { requireRole } from '@/app/api/services/auth/guards';
import { OrderStatus, UserRole } from '@/app/generated/prisma/enums';
import { Permission, requirePermission } from '@/app/lib/permissions';
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  adminNotes: z.string().optional().nullable(),
  note: z.string().optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const adminUser = await requireRole([
      UserRole.STAFF,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ]);

    requirePermission(adminUser, Permission.MANAGE_ORDERS);

    const { id } = await context.params;
    const body = await request.json();
    const result = updateOrderStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const { status, adminNotes, note } = result.data;

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const updatedOrder = await prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id },
        data: {
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : order.adminNotes,
          statusEvents: {
            create: {
              fromStatus: order.status,
              toStatus: status,
              note: note || `Status updated to ${status} by admin.`,
              actorId: adminUser.id,
            },
          },
        },
        include: { statusEvents: true, items: true },
      });

      await tx.auditLog.create({
        data: {
          actorId: adminUser.id,
          action: 'UPDATE_ORDER_STATUS',
          entityType: 'Order',
          entityId: id,
          changes: { from: order.status, to: status },
        },
      });

      return updated;
    });

    return NextResponse.json({
      message: 'Order updated successfully',
      order: updatedOrder,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    console.error('Admin update order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}