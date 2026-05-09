import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get actual referral data from database
    // For now, return mock data
    return NextResponse.json({
      code: 'REF12345ABC',
      totalReferrals: 5,
      totalCommission: 5000,
      activeReferrals: 4,
      referrals: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          commission: 1000,
          status: 'active',
          joinedDate: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          commission: 1500,
          status: 'active',
          joinedDate: new Date().toISOString(),
        },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
