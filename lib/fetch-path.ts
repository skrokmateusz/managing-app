import { connectToDatabase } from '@/lib/db';
import { MongoClient } from 'mongodb';

export const fetchPath = async (email: string) => {
	const client = await MongoClient.connect(
		'mongodb+srv://mateuszskrok:mateuszskrok@cluster0.p399b1p.mongodb.net/manage?retryWrites=true&w=majority'
	);
	const db = client.db();

	const existingUser = await db.collection('managing-app').findOne({ email: email });

	return existingUser;
};
