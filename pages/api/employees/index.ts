import { connectToDatabase } from '@/lib/db';
import {} from '@/helpers/api-util';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let client;

	client = await connectToDatabase();

    if (req.method === 'POST') {
        
    }
};
