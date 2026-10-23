import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../services/auth/guards';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(url.searchParams.get('limit') || '10', 10)));
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { customerId: user.id },
        include: {
          items: true,
          payments: {
            select: {
              id: true,
              provider: true,
              status: true,
              amount: true,
              currency: true,
              paidAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { customerId: user.id } }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Fetch customer orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}