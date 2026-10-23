import { NextResponse } from 'next/server';
import { AccountStatus } from '@/app/generated/prisma/browser';
import { loginSchema } from '@/app/lib/validations/auth';
import { prisma } from '@/app/lib/prisma';
import { verifyPassword, createSession, SESSION_COOKIE_NAME, SESSION_DURATION_DAYS } from '../../services/auth/authService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email or password format' }, { status: 400 });
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Use generic error messages to prevent user enumeration
    const genericErrorResponse = NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    );

    if (!user || !user.passwordHash) {
      return genericErrorResponse;
    }

    if (user.status === AccountStatus.SUSPENDED) {
      return NextResponse.json(
        { error: 'This account has been suspended. Please support.' },
        { status: 403 }
      );
    }

    const isValid = await verifyPassword(user.passwordHash, password);
    if (!isValid) {
      return genericErrorResponse;
    }

    const token = await createSession(user.id);
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}