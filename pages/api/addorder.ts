import { connectToDatabase } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const data = req.body;
		const { date, purchaser, value, delivery, products, email } = data;

		const client = await connectToDatabase();
		const db = client.db();

		const existingUser = await db.collection('authentication').findOne({ email: email });

		const name = `${existingUser.firstName} ${existingUser.lastName}`;

		const result = await db
			.collection('orders')
			.insertOne({ date, purchaser, value, delivery, products, createdBy: name, email });

		client.close();
		res.status(201).json({ message: 'Added order' });
	}
};

export default handler;
