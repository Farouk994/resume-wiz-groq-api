// src/app/api/users/route.ts

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongoose'; // Adjust the import path as needed
import { createUser } from '@/lib/actions/user.actions';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, password, preferences } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    // Create user
    const newUser = await createUser({ name, email, password, preferences });
    console.log('newUser ====>',newUser)

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.message.includes('exists')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    } else {
      return NextResponse.json(
        { error: 'An error occurred while creating the user.' },
        { status: 500 }
      );
    }
  }
}
