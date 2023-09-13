import React, { useRef, FormEvent } from 'react';

import AdminLayout from '@/components/layouts/admin-layout';
import { SalesRegion } from '@/data/region';

const createUser = async (
	firstName: string,
	lastName: string,
	email: string,
	phone: string,
	adress: string,
	region: string
) => {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, phone: phone, adress: adress, region: region }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	console.log('ok');
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong');
	}

	return data;
};

const AddEmployeePage = () => {
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const adressRef = useRef<HTMLInputElement>(null);
	const regionRef = useRef<HTMLSelectElement>(null);

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();
		const enteredFirstName = firstNameRef.current!.value;
		const enteredLastName = lastNameRef.current!.value;
		const enteredEmail = emailRef.current!.value;
		const enteredPhone = phoneRef.current!.value;
		const enteredAdress = adressRef.current!.value;
		const enteredRegion = regionRef.current!.value;

		const result = await createUser(enteredFirstName, enteredLastName, enteredEmail, enteredPhone, enteredAdress, enteredRegion);
		console.log(result);
	};
	return (
		<AdminLayout>
			<div className="flex items-center h-screen my-0 mx-auto">
				<form className="card flex flex-col space-y-2 p-5" onSubmit={submitHandler}>
					<label htmlFor="first-name">First Name:</label>
					<input type="text" ref={firstNameRef} />
					<label htmlFor="last-name">Last Name:</label>
					<input type="text" ref={lastNameRef} />
					<label htmlFor="email">Email:</label>
					<input type="text" ref={emailRef} />
					<label htmlFor="phone">Phone number:</label>
					<input type="text" ref={phoneRef} />
					<label htmlFor="adress">Adress:</label>
					<input type="text" ref={adressRef} />
					<label htmlFor="region">Region to sale:</label>
					<select name="region" id="sales-region" ref={regionRef}>
						{SalesRegion.map(region => (
							<option key={region} value={region}>
								{region}
							</option>
						))}
					</select>
					<button>Save</button>
				</form>
			</div>
		</AdminLayout>
	);
};

export default AddEmployeePage;
