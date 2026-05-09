import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, bankDetails } = body;

    // TODO: Implement withdrawal request submission to database
    // For now, return mock response
    if (amount && bankDetails) {
      return NextResponse.json({
        success: true,
        message: 'Withdrawal request submitted successfully',
        requestId: 'WD' + Date.now(),
        amount,
        status: 'pending',
      });
    }

    return NextResponse.json(
      { message: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
