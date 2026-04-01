import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substr(2, 9);
  console.log(`[${requestId}] POST /api/auth/login`);

  try {
    const body = await request.json();
    const { username, password } = body;

    console.log(`[${requestId}] Login attempt for username: ${username}`);

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    // Mock validation
    if (username.length < 3 || password.length < 3) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Mock user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username: username,
      email: `${username}@example.com`,
      loggedInAt: new Date().toISOString(),
    };

    console.log(`[${requestId}] ✓ Login successful`);

    const response = NextResponse.json(
      { success: true, user, message: 'Logged in successfully' },
      { status: 200 }
    );

    // Set secure session cookie
    response.cookies.set({
      name: 'session',
      value: JSON.stringify(user),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error(`Login error:`, error.message);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
