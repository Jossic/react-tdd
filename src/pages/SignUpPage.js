import React from 'react';

const SignUpPage = () => {
	return (
		<>
			<h1>Sign Up</h1>
			<label htmlFor='username'>Username</label>
			<input id='username' />
			<label htmlFor='email'>E-mail</label>
			<input id='email' />
			<label htmlFor='password'>Password</label>
			<input id='password' type='password' />
			<label htmlFor='passwordRepeat'>Password Repeat</label>
			<input id='passwordRepeat' type='password' />
			{/* <input type='button' value='Sign Up' /> */}
			<button disabled>Sign Up</button>
		</>
	);
};

export default SignUpPage;
