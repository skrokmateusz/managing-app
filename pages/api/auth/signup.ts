import { connectToDatabase } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req);
	if (req.method === 'POST') {
		const data = req.body;

		const { firstName, lastName, email, phone, adress, region } = data;
		console.log(firstName);
		if (
			firstName.trim().length < 3 ||
			lastName.trim().length < 3 ||
			!email.includes('@') ||
			phone.trim().length < 9 ||
			phone.trim().length > 9
		) {
			res.status(422).json({ message: 'Invalid input' });
			return;
		}
		const client = await connectToDatabase();
		const db = client.db();

		const existingUser = await db.collection('managing-app').findOne({ email: email });
		if (existingUser) {
			res.status(422).json({ message: 'User already exist' });
			client.close();
			return;
		}

		const hashedPassword = await hashPassword(email);

		const result = await db
			.collection('managing-app')
			.insertOne({ firstName, lastName, email, phone, adress, region, password: hashedPassword });

		res.status(201).json({ message: 'Created user!' });
	}
};

export default handler;
