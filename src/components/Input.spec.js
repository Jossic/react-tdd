import { render } from '@testing-library/react';
import { Input } from './Input';

it('should have is-invalid class for input when error is set', () => {
	const { container } = render(<Input error='error message' />);
	const input = container.querySelector('input');
	expect(input.classList).toContain('is-invalid');
});

it('should have invalid-feedback class for span when error is set', () => {
	const { container } = render(<Input error='error message' />);
	const span = container.querySelector('span');
	expect(span.classList).toContain('invalid-feedback');
});

it("shouldn't have is-invalid class for input when error is not set", () => {
	const { container } = render(<Input />);
	const input = container.querySelector('input');
	expect(input.classList).not.toContain('is-invalid');
});
