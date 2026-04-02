import { describe, it, expect } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

// Mock the login route handler
const mockLoginHandler = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    if (username.length < 3 || password.length < 3) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username: username,
      email: `${username}@example.com`,
      loggedInAt: new Date().toISOString(),
    };

    const response = NextResponse.json(
      { success: true, user, message: 'Logged in successfully' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'session',
      value: JSON.stringify(user),
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
};

describe('Login API Route - API Tests', () => {
  it('should return 400 if username or password is missing', async () => {
    const request = new NextRequest(new URL('http://localhost:3000/api/auth/login'), {
      method: 'POST',
      body: JSON.stringify({ username: '', password: '' }),
    });

    const response = await mockLoginHandler(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Username and password required');
  });

  it('should return 401 if credentials are invalid', async () => {
    const request = new NextRequest(new URL('http://localhost:3000/api/auth/login'), {
      method: 'POST',
      body: JSON.stringify({ username: 'ab', password: 'pa' }),
    });

    const response = await mockLoginHandler(request);
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Invalid credentials');
  });

  it('should return 200 and user data on successful login', async () => {
    const request = new NextRequest(new URL('http://localhost:3000/api/auth/login'), {
      method: 'POST',
      body: JSON.stringify({ username: 'testuser', password: 'password123' }),
    });

    const response = await mockLoginHandler(request);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.user).toHaveProperty('id');
    expect(data.user).toHaveProperty('username', 'testuser');
    expect(data.user).toHaveProperty('email', 'testuser@example.com');
  });

  it('should set session cookie on successful login', async () => {
    const request = new NextRequest(new URL('http://localhost:3000/api/auth/login'), {
      method: 'POST',
      body: JSON.stringify({ username: 'testuser', password: 'password123' }),
    });

    const response = await mockLoginHandler(request);
    expect(response.status).toBe(200);

    const cookies = response.cookies.getAll();
    const sessionCookie = cookies.find((c) => c.name === 'session');
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie?.httpOnly).toBe(true);
  });
});
