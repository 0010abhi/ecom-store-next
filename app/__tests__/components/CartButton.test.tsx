import { describe, it, expect, beforeEach } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartButton from '../../_components/Profile/CartButton'

describe('CartButton Component - Component Tests', () => {
  it('should render cart button with emoji', () => {
    render(<CartButton />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.textContent).toContain('🛒');
  });

  it('should have correct href to /cart', () => {
    render(<CartButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/cart');
  });

  it('should be keyboard accessible', () => {
    render(<CartButton />);
    const link = screen.getByRole('link');
    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href');
  });
});
