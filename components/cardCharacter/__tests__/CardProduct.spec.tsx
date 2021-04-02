import React from 'react';
import { render, screen } from '@testing-library/react';
import CardCharacter from '../CardCharacter';
import { CharacterMock } from './fixtures';
import { buildSpy, noop, userEvent } from '../../../utils/testHelper';

describe('CardCharacter', () => {
  it('should render CardCharacter', () => {
    render(<CardCharacter character={CharacterMock} onClick={noop} />);

    expect(screen.getByText(CharacterMock.name)).toBeInTheDocument();
  });

  it('should call onChange when click in increment and decrement button', () => {
    const spyOnClick = buildSpy();

    render(<CardCharacter character={CharacterMock} onClick={spyOnClick} testId="character-id" />);
    userEvent.click(screen.getByTestId('character-id'));
    expect(spyOnClick).toBeCalledTimes(1);
  });
});
