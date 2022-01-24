import React from 'react';

export const Input = ({ id, label, values, setValues, errors, type }) => {
	return (
		<div className='mb-3'>
			<label htmlFor={id} className='form-label'>
				{label}
			</label>
			<input
				id={id}
				className='form-control'
				type={type}
				onChange={(e) =>
					setValues({
						...values,
						[id]: e.target.value,
					})
				}
			/>
			{errors && <span className='text-danger'>{errors}</span>}
		</div>
	);
};
