import { render, screen } from '@testing-library/react';
import React from 'react';
import Section from '../Section';

describe('Section', () => {
  it('should render Section', () => {
    render(<Section>SECTION</Section>);

    expect(screen.getByText(/SECTION/i)).toBeInTheDocument();
  });
});
