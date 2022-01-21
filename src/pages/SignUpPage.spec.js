import SignUpPage from './SignUpPage';
import { render, screen } from '@testing-library/react';

describe('>SignUp Page', () => {
	describe('>Layout', () => {
		it('should have header', () => {
			render(<SignUpPage />);
			const header = screen.queryByRole('heading', { name: 'Sign Up' });
			expect(header).toBeInTheDocument();
		});

		it('should have username input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Username');
			expect(input).toBeInTheDocument();
		});

		it('should have email input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('E-mail');
			expect(input).toBeInTheDocument();
		});

		it('should have password input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password');
			expect(input).toBeInTheDocument();
		});

		it('should have password type for password input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password');
			expect(input.type).toBe('password');
		});
		it('should have password repeat input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password Repeat');
			expect(input).toBeInTheDocument();
		});

		it('should have password type for password repeat input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password Repeat');
			expect(input.type).toBe('password');
		});

		it('should have sign up button', () => {
			render(<SignUpPage />);
			const button = screen.queryByRole('button', { name: 'Sign Up' });
			expect(button).toBeInTheDocument();
		});
		it('should have initial disabled sign up button', () => {
			render(<SignUpPage />);
			const button = screen.queryByRole('button', { name: 'Sign Up' });
			expect(button).toBeDisabled();
		});
	});
});
