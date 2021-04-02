import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('should render header', () => {
    render(<Header />);

    expect(screen.getByText(/CHARACTERS/i)).toBeInTheDocument();
  });
});
