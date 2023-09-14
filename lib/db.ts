import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://mateuszskrok:mateuszskrok@cluster0.p399b1p.mongodb.net/manage-app?retryWrites=true&w=majority'
	);

	return client;
};
