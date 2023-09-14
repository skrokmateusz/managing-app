import React, { FormEvent, useRef } from 'react';

const AddOrderForm: React.FC<{ email: string }> = props => {
	const { email } = props;
	console.log(email);
	const dateRef = useRef(null);
	const purchaserRef = useRef(null);
	const valueRef = useRef(null);
	const deliveryRef = useRef(null);
	const productsRef = useRef(null);

	const submitOrderHandler = async (event: FormEvent) => {
		event.preventDefault();

		const date = dateRef.current!.value;
		const purchaser = purchaserRef.current!.value;
		const value = valueRef.current!.value;
		const delivery = deliveryRef.current!.value;
		const products = productsRef.current!.value;
		console.log(date);
		const response = await fetch('/api/addorder', {
			method: 'POST',
			body: JSON.stringify({ date, purchaser, value, delivery, products, email: email }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		console.log(data);
	};

	return (
		<div className="card absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 w-1/3 p-6">
			<form onSubmit={submitOrderHandler} className="flex flex-col space-y-3">
				<label htmlFor="date">Date of order:</label>
				<input type="date" ref={dateRef} />
				<label htmlFor="purchaser">Purchaser:</label>
				<input type="text" ref={purchaserRef} />
				<label htmlFor="value">Value:</label>
				<input type="number" ref={valueRef} />
				<label htmlFor="delivery">Delivery adress:</label>
				<input type="text" ref={deliveryRef} />
				<label htmlFor="products">Products:</label>
				<input type="text" ref={productsRef} />
				<button className="">Save order</button>
			</form>
		</div>
	);
};

export default AddOrderForm;
