import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/lib/db';
import { getAllEmployees } from '@/helpers/api-util';
import { MongoClient } from 'mongodb';

import AddOrderForm from '@/components/employee-dashboard/add-order-form';

const DashboardPage: React.FC<{ session: any; data: any }> = props => {
	const { session, data } = props;
	const newData = JSON.parse(data)
	console.log(newData);

	const [orderList, setOrderList] = useState();
	const [newOrder, setNewOrder] = useState(false);

	const addOrderHandler = () => {
		setNewOrder(prevState => !prevState);
	};

	return (
		<div className="w-screen h-screen relative">
			<div className="w-5/6 h-screen my-0 mx-auto flex flex-col justify-center">
				<div className="card h-5/6">
					<div className="flex items-center justify-between text-3xl p-6">
						<h2 className="">Hello Mateusz! Your orders:</h2>
						<div>
							<button className="mr-3" onClick={addOrderHandler}>
								Add order
							</button>
							<button>Log out</button>
						</div>
					</div>
				</div>

				{newOrder && <AddOrderForm email={session.user.email} />}
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	const email = session.user.email;

	const client = await MongoClient.connect(
		'mongodb+srv://mateuszskrok:mateuszskrok@cluster0.p399b1p.mongodb.net/manage-app?retryWrites=true&w=majority'
	);
	const db = client.db();

	const documents = await db.collection('orders').find({ email }).toArray();
const data = JSON.stringify(documents)


	return {
		props: { session, data },
	};
}

export default DashboardPage;

// let productList: Product[] = []
// for (const key in data) {
// 	productList.push(data[key])
// }

// let categoriesList: string[] = []
