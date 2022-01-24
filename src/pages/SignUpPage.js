import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		passwordRepeat: '',
		apiProgress: false,
		signupSuccess: false,
		errors: {},
	});

	const { password, passwordRepeat, apiProgress, signupSuccess, errors } =
		values;
	let disabled = true;
	if (password && passwordRepeat) {
		disabled = password !== passwordRepeat;
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		const { username, email, password } = values;
		const body = { username, email, password };
		setValues({ ...values, apiProgress: true });
		try {
			await axios.post('/api/1.0/users', body);
			setValues({ ...values, signupSuccess: true });
		} catch (error) {
			if (error.response.status === 400) {
				setValues({
					...values,
					errors: error.response.data.validationErrors,
				});
			}
			// console.log(`catch error =>`, error);
		}
	};
	return (
		<div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2'>
			{!signupSuccess && (
				<form className='card mt-5' data-testid='form-sign-up'>
					<div className='card-header'>
						<h1 className='text-center'>Sign Up</h1>
					</div>
					<div className='card-body'>
						<div className='mb-3'>
							<label htmlFor='username' className='form-label'>
								Username
							</label>
							<input
								id='username'
								className='form-control'
								onChange={(e) =>
									setValues({
										...values,
										username: e.target.value,
									})
								}
							/>
							{errors.username && (
								<span className='text-danger'>
									{errors.username}
								</span>
							)}
						</div>
						<div className='mb-3'>
							<label htmlFor='email' className='form-label'>
								E-mail
							</label>
							<input
								id='email'
								className='form-control'
								onChange={(e) =>
									setValues({
										...values,
										email: e.target.value,
									})
								}
							/>
							{errors.email && (
								<span className='text-danger'>
									{errors.email}
								</span>
							)}
						</div>
						<div className='mb-3'>
							<label htmlFor='password' className='form-label'>
								Password
							</label>
							<input
								id='password'
								type='password'
								className='form-control'
								onChange={(e) =>
									setValues({
										...values,
										password: e.target.value,
									})
								}
							/>
							{errors.password && (
								<span className='text-danger'>
									{errors.password}
								</span>
							)}
						</div>
						<div className='mb-3'>
							<label
								htmlFor='passwordRepeat'
								className='form-label'>
								Password Repeat
							</label>
							<input
								id='passwordRepeat'
								className='form-control'
								type='password'
								onChange={(e) =>
									setValues({
										...values,
										passwordRepeat: e.target.value,
									})
								}
							/>
						</div>
						<div className='text-center'>
							<button
								className='btn btn-primary'
								disabled={disabled || apiProgress}
								onClick={(e) => onSubmit(e)}>
								{apiProgress && (
									<span
										className='spinner-border spinner-border-sm me-2'
										role='status'
									/>
								)}
								Sign Up
							</button>
						</div>
					</div>
				</form>
			)}
			{signupSuccess && (
				<div className='alert alert-info mt-3'>
					Please check your e-mail to activate your account
				</div>
			)}
		</div>
	);
};

export default SignUpPage;
