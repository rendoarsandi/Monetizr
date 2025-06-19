import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock database
let bankAccountDetails: any = null;

async function verifyAuthToken(token: string | undefined) {
  if (!token) {
    return null;
  }
  // Mock verification
  return { id: 'user-123' };
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const user = await verifyAuthToken(token);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { bankName, accountHolderName, accountNumber } = body;

    // In a real app, save this to the database, associated with user.id
    bankAccountDetails = { bankName, accountHolderName, accountNumber };

    console.log('Bank account details saved:', bankAccountDetails);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save bank account' }, { status: 500 });
  }
}