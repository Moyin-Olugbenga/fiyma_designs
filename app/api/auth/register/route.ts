import { NextResponse } from 'next/server';
import { UserRole, AccountStatus } from '@/app/generated/prisma/browser';
import { prisma } from '@/app/lib/prisma';
import { registerSchema } from '@/app/lib/validations/auth';
import { hashPassword, createSession, SESSION_COOKIE_NAME, SESSION_DURATION_DAYS } from '../../services/auth/authService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user with forced CUSTOMER role and ACTIVE status (never trust client role input)
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        role: UserRole.CUSTOMER,
        status: AccountStatus.ACTIVE,
      },
    });

    // Create session and set HTTP-only cookie
    const token = await createSession(newUser.id);
    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
        },
      },
      { status: 201 }
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
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}