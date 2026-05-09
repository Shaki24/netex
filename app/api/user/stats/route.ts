import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get actual user data from database
    // For now, return mock data
    return NextResponse.json({
      balance: 5000,
      totalEarnings: 15000,
      referrals: 5,
      prayers: 12,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
