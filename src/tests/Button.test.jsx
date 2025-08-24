import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/common/Button/Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyle('background-color: #2196F3');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    await userEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different variant', () => {
    render(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByText('Outline Button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyle('border: 1px solid #2196F3');
  });

  it('is disabled when disabled prop is true', async () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    await userEvent.click(screen.getByText('Disabled Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
