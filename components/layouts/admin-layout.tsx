import React, { ReactElement } from 'react';
import Link from 'next/link';

const AdminLayout: React.FC<{ children: ReactElement }> = ({ children }) => {
	return (
		<div className="flex w-screen h-screen">
			<div className="theme-color text-white flex flex-col justify-center p-5 w-1/4 h-screen relative xl:w-1/5">
				<Link href={'/admin/dashboard'}><h2 className="text-2xl absolute top-5 left-5 lg:text-4xl">EXAMPLE.</h2></Link>
				<ul className="flex flex-col space-y-4 lg:text-2xl">
					<li>Employees List</li>
					<li>Orders</li>
					<li>Cars</li>
					<li>Incomes</li>
					<li>Expenses</li>
					<Link href={'/admin/add-employee'}>Add Employee</Link>
					<li>Delete Employee</li>
				</ul>
			</div>
			<div className='w-3/4 xl:4/5 flex'>{children}</div>
		</div>
	);
};

export default AdminLayout;
