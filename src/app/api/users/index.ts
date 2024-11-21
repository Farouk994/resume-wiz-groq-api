// pages/api/users/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/actions/user.actions';
import { connectToDatabase } from '@/lib/database/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { name, email, password, preferences } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
      }

      // Create user
      const newUser = await createUser({ name, email, password, preferences });

      res.status(201).json({ message: 'User created successfully.', userId: newUser._id });
    } catch (error: any) {
      console.error('Error creating user:', error);
      if (error.message.includes('exists')) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An error occurred while creating the user.' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
