import React, { useState } from 'react';

const SignUpPage = () => {
	const [values, setValues] = useState({});

	const { password, passwordRepeat } = values;
	let disabled = true;
	if (password && passwordRepeat) {
		disabled = password !== passwordRepeat;
	}
	return (
		<>
			<h1>Sign Up</h1>
			<label htmlFor='username'>Username</label>
			<input id='username' />
			<label htmlFor='email'>E-mail</label>
			<input id='email' />
			<label htmlFor='password'>Password</label>
			<input
				id='password'
				type='password'
				onChange={(e) =>
					setValues({
						...values,
						password: e.target.value,
					})
				}
			/>
			<label htmlFor='passwordRepeat'>Password Repeat</label>
			<input
				id='passwordRepeat'
				type='password'
				onChange={(e) =>
					setValues({
						...values,
						passwordRepeat: e.target.value,
					})
				}
			/>
			<button disabled={disabled}>Sign Up</button>
		</>
	);
};

export default SignUpPage;
