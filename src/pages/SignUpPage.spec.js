import SignUpPage from './SignUpPage';
import { render, screen } from '@testing-library/react';

it('should have header', () => {
	render(<SignUpPage />);
	const header = screen.queryByRole('heading', { name: 'Sign Up' });
	expect(header).toBeInTheDocument();
});
