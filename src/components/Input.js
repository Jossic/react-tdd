import React from 'react';

export const Input = ({ id, label, onChange, error, type = 'text' }) => {
	return (
		<div className='mb-3'>
			<label htmlFor={id} className='form-label'>
				{label}
			</label>
			<input
				id={id}
				className={`form-control ${error && 'is-invalid'}`}
				type={type}
				onChange={onChange}
			/>
			{error && <span className='invalid-feedback'>{error}</span>}
		</div>
	);
};
