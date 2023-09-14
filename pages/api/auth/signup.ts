import { connectToDatabase } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	if (req.method === 'POST') {
		const data = req.body;

		const { firstName, lastName, email, phone, adress, region } = data;

		const client = await connectToDatabase();
		const db = client.db();

		const existingUser = await db.collection('authentication').findOne({ email: email });
		if (existingUser) {
			res.status(422).json({ message: 'User already exist' });
			client.close();
			return;
		}

		const hashedPassword = await hashPassword(email);

		const result = await db
			.collection('authentication')
			.insertOne({ firstName, lastName, email, phone, adress, region, password: hashedPassword });

		res.status(201).json({ message: 'Created user!' });
	}
};

export default handler;


// 
