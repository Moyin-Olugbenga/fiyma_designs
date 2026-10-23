import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { invalidateSession, SESSION_COOKIE_NAME } from '../../services/auth/authService';


export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      await invalidateSession(token);
    }

    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: '',
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}