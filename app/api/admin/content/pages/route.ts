import { requireRole } from '@/app/api/services/auth/guards';
import { UserRole } from '@/app/generated/prisma/enums';
import { Permission, requirePermission } from '@/app/lib/permissions';
import { prisma } from '@/app/lib/prisma';
import { contentPageUpsertSchema } from '@/app/lib/validations/operations';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const adminUser = await requireRole([
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ]);

    requirePermission(adminUser, Permission.MANAGE_CONTENT);

    const body = await request.json();
    const result = contentPageUpsertSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const data = result.data;

    const page = await prisma.contentPage.upsert({
      where: { slug: data.slug },
      update: {
        title: data.title,
        content: data.content,
        status: data.status,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
      create: {
        slug: data.slug,
        title: data.title,
        content: data.content,
        status: data.status,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
    });

    return NextResponse.json({ message: 'Content page saved successfully', page }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    console.error('Admin content page error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}