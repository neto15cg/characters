import React from 'react';
import { render, screen } from '@testing-library/react';
import { buildSpy, userEvent } from '../../../utils/testHelper';
import Button from '../Button';

describe('Button', () => {
  it('should call action on click', async () => {
    const spy = buildSpy();
    render(
      <Button onClick={spy} type="button">
        text
      </Button>,
    );

    userEvent.click(screen.getByRole('button', { name: /text/i }));
    expect(spy).toHaveBeenCalled();
  });

  it('should not call action on click when loading status is true', () => {
    const spy = buildSpy();
    render(
      <Button onClick={spy} type="button" loading>
        text
      </Button>,
    );

    userEvent.click(screen.getByRole('button', { name: /text/i }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call action on click when button is disabled', () => {
    const spy = buildSpy();
    render(
      <Button onClick={spy} type="button" disabled>
        text
      </Button>,
    );

    userEvent.click(screen.getByRole('button', { name: /text/i }));
    expect(spy).not.toHaveBeenCalled();
  });
});
