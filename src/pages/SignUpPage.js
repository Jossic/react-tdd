import React, { useState } from 'react';
import axios from 'axios';
import e from 'express';

const SignUpPage = () => {
	const [values, setValues] = useState({});

	const { password, passwordRepeat } = values;
	let disabled = true;
	if (password && passwordRepeat) {
		disabled = password !== passwordRepeat;
	}

	const onSubmit = (e) => {
		e.preventDefault();
		const { username, email, password } = values;
		const body = { username, email, password };
		axios.post('/api/1.0/users', body);
	};
	return (
		<>
			<h1>Sign Up</h1>
			<form>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					onChange={(e) =>
						setValues({
							...values,
							username: e.target.value,
						})
					}
				/>
				<label htmlFor='email'>E-mail</label>
				<input
					id='email'
					onChange={(e) =>
						setValues({
							...values,
							email: e.target.value,
						})
					}
				/>
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
				<button disabled={disabled} onClick={(e) => onSubmit(e)}>
					Sign Up
				</button>
			</form>
		</>
	);
};

export default SignUpPage;
