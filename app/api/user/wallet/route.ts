import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get actual wallet data from database
    // For now, return mock data
    return NextResponse.json({
      balance: 5000,
      transactions: [
        { id: '1', amount: 1000, type: 'credit', date: new Date().toISOString() },
        { id: '2', amount: 500, type: 'debit', date: new Date().toISOString() },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
