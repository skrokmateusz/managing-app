import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

function StartingPageContent() {
	const router = useRouter();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { data: session, status } = useSession();

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();
		const enteredEmail = emailRef.current!.value;
		const enteredPassword = passwordRef.current!.value;
		const result = await signIn('credentials', { redirect: false, email: enteredEmail, password: enteredPassword });

		if (!result.ok) {
			return;
		}
		router.replace(`/${enteredEmail.slice(0, -12)}/dashboard`);
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col card rounded-xl p-10">
				<h2 className="mb-5 text-4xl text-center">Welcome !</h2>
				<p className="mb-5 text-xl text-center">Log in to continue</p>
				<form onSubmit={submitHandler}>
					<div className="flex flex-col justify-center mb-5">
						<label className="mb-1 text-xl" htmlFor="email">
							Email:
						</label>
						<input
							className=" text-xl rounded-md py-1 px-3 border border-solid border-black"
							type="text"
							ref={emailRef}
						/>
					</div>
					<div className="flex flex-col mb-7">
						<label className="mb-1 text-xl" htmlFor="password">
							Password:
						</label>
						<input
							className=" text-xl rounded-md py-1 px-3 border border-solid border-black"
							type="password"
							ref={passwordRef}
						/>
					</div>
					<div className="flex justify-center items-center">
						<button className="theme-color text-xl bg-green-500 py-2 px-6 rounded-md border-black font-medium">
							Log in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default StartingPageContent;
