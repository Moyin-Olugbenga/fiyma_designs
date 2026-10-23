import { NextResponse } from 'next/server';
import { requireRole } from '../../services/auth/guards';
import { PaymentStatus, UserRole } from '@/app/generated/prisma/enums';
import { Permission, requirePermission } from '@/app/lib/permissions';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const adminUser = await requireRole([
      UserRole.STAFF,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ]);

    requirePermission(adminUser, Permission.VIEW_ANALYTICS);

    // Compute metrics from successfully paid orders
    const [revenueAgg, totalOrdersCount, pendingOrdersCount, totalCustomersCount] = await Promise.all([
      prisma.order.aggregate({
        where: { paymentStatus: PaymentStatus.SUCCESS },
        _sum: { grandTotal: true },
      }),
      prisma.order.count({
        where: { paymentStatus: PaymentStatus.SUCCESS },
      }),
      prisma.order.count({
        where: { paymentStatus: PaymentStatus.PENDING },
      }),
      prisma.user.count({
        where: { role: UserRole.CUSTOMER },
      }),
    ]);

    // Record audit log for sensitive analytics access
    await prisma.auditLog.create({
      data: {
        actorId: adminUser.id,
        action: 'VIEW_ANALYTICS',
        entityType: 'Analytics',
        entityId: 'global',
      },
    });

    return NextResponse.json({
      metrics: {
        totalRevenue: revenueAgg._sum.grandTotal || 0,
        currency: 'NGN',
        successfulOrders: totalOrdersCount,
        pendingOrders: pendingOrdersCount,
        totalCustomers: totalCustomersCount,
      },
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    console.error('Admin analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}