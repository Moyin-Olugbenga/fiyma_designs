import crypto from 'crypto';
import { User, UserRole, AccountStatus } from '@/app/generated/prisma/browser';
import { prisma } from '@/app/lib/prisma';
import { SESSION_COOKIE_NAME } from './authService';
import { cookies } from 'next/headers';

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session || session.revokedAt || session.expiresAt < new Date()) {
    return null;
  }

  if (session.user.status === AccountStatus.SUSPENDED) {
    return null;
  }

  return session.user;
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]): Promise<User> {
  const user = await requireUser();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('FORBIDDEN');
  }
  return user;
}