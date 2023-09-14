import { connectToDatabase } from '@/lib/db';

export const getAllEmployees = async (client: any, collection: string, email: {}, sort: {}) => {
	const db = client.db();
	const documents = await db.collection(collection).find(email).sort(sort).toArray();

	return documents;
};
