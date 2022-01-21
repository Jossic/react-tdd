import SignUpPage from './SignUpPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

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
		it('should send username, email, password to back after clicking button', async () => {
			let requestBody;
			const server = setupServer(
				rest.post('/api/1.0/users', (req, res, ctx) => {
					requestBody = req.body;
					return res(ctx.status(200));
				})
			);
			server.listen();
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
			userEvent.click(button);
			const mockFn = jest.fn();
			// axios.post = mockFn;
			window.fetch = mockFn;

			await new Promise((resolve) => setTimeout(resolve, 500));
			// const firstCallOfMockFunction = mockFn.mock.calls[0];
			// const body = firstCallOfMockFunction[1];
			// const body = JSON.parse(firstCallOfMockFunction[1].body);
			// console.log(`body =>`, body);
			expect(requestBody).toEqual({
				username: 'user1',
				email: 'user1@mail.com',
				password: 'Password',
			});
		});
	});
});
