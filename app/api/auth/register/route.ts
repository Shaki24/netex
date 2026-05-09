import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, referralCode } = body;

    // TODO: Implement actual registration with database
    // For now, return mock response
    if (name && email && password) {
      return NextResponse.json({
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: '1',
          name,
          email,
          referralCode: 'REF' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
      });
    }

    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
