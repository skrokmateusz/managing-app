import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

export const authOptions = {
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection('managing-app');
				const user = await usersCollection.findOne({ email: credentials.email });

				if (!user) {
					throw new Error('No user found');
				}

				const isValid = await verifyPassword(credentials.password, user.password);

				if (!isValid) {
					throw new Error('Could not log you in');
				}
				console.log(user);

				client.close();
				if (user && isValid) {
					return {
						email: user.email,
					};
					return null;
				}
			},
		}),
	],
};

export default NextAuth(authOptions);
