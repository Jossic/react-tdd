import React from 'react';

export const Input = ({
	id,
	label,
	values,
	setValues,
	error,
	type = 'text',
}) => {
	return (
		<div className='mb-3'>
			<label htmlFor={id} className='form-label'>
				{label}
			</label>
			<input
				id={id}
				className={`form-control ${error && 'is-invalid'}`}
				type={type}
				onChange={(e) =>
					setValues({
						...values,
						[id]: e.target.value,
					})
				}
			/>
			{error && <span className='invalid-feedback'>{error}</span>}
		</div>
	);
};
