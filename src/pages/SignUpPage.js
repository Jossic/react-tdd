import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../components/Input';

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
			setValues({ ...values, signupSuccess: true, apiProgress: false });
		} catch (error) {
			if (error.response.status === 400) {
				setValues({
					...values,
					apiProgress: false,
					errors: error.response.data.validationErrors,
				});
			}
			// console.log(`catch error =>`, error);
		}
	};

	return (
		<div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2'>
			{!signupSuccess && (
				<form
					className='card mt-5 needs-validation'
					data-testid='form-sign-up'
					noValidate={true}>
					<div className='card-header'>
						<h1 className='text-center'>Sign Up</h1>
					</div>
					<div className='card-body'>
						<Input
							id='username'
							label='Username'
							values={values}
							setValues={setValues}
							error={errors.username}
						/>
						<Input
							id='email'
							label='E-mail'
							values={values}
							setValues={setValues}
							error={errors.email}
						/>
						<Input
							id='password'
							label='Password'
							type='password'
							values={values}
							setValues={setValues}
							error={errors.password}
						/>
						<Input
							id='passwordRepeat'
							label='Password Repeat'
							type='password'
							values={values}
							setValues={setValues}
							error={
								password !== passwordRepeat &&
								'Passwords mismatch'
							}
						/>

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
