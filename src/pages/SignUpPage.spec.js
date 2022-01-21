import SignUpPage from './SignUpPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

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

	describe('Interactions', () => {
		it('should enable the button when passwords are equals', () => {
			render(<SignUpPage />);
			const passwordInput = screen.getByLabelText('Password');
			const passwordRepeatInput =
				screen.getByLabelText('Password Repeat');
			userEvent.type(passwordInput, 'Password');
			userEvent.type(passwordRepeatInput, 'Password');
			const button = screen.queryByRole('button', { name: 'Sign Up' });
			expect(button).toBeEnabled();
		});
		it('should send username, email, password to back after clicking button', () => {
			render(<SignUpPage />);
			const usernameInput = screen.getByLabelText('Username');
			const emailInput = screen.getByLabelText('E-mail');
			const passwordInput = screen.getByLabelText('Password');
			const passwordRepeatInput =
				screen.getByLabelText('Password Repeat');
			userEvent.type(usernameInput, 'user1');
			userEvent.type(emailInput, 'user1@mail.com');
			userEvent.type(passwordInput, 'Password');
			userEvent.type(passwordRepeatInput, 'Password');
			const button = screen.queryByRole('button', { name: 'Sign Up' });

			const mockFn = jest.fn();
			// console.log(`mockFn =>`, mockFn)
			axios.post = mockFn;

			userEvent.click(button);

			const firstCallOfMockFunction = mockFn.mock.calls[0];

			const body = firstCallOfMockFunction[1];
			// console.log(`body =>`, body);
			expect(body).toEqual({
				username: 'user1',
				email: 'user1@mail.com',
				password: 'Password',
			});
		});
	});
});
