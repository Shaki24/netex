import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: Implement actual authentication
    // For now, return mock response
    if (email && password) {
      return NextResponse.json({
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: '1',
          email,
          name: 'User',
        },
      });
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
