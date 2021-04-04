import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { buildSpy, userEvent } from '../../../utils/testHelper';
import Detail from '../Detail';
import { DetailMock } from './fixtures';

describe('DetailContainer', () => {
  it('should render DetailContainer', async () => {
    render(<Detail character={DetailMock} />);

    expect(screen.queryAllByText(/Brainiac 5$/)).toHaveLength(3);
  });

  it('should call goBack when click in back button', async () => {
    const spy = buildSpy();
    render(<Detail character={DetailMock} onGoBack={spy} />);

    userEvent.click(screen.getByRole('button', { name: /Back/i }));

    expect(spy).toBeCalled();
  });

  it('should call addFavorite if no is favorite', async () => {
    const spy = buildSpy();
    render(<Detail character={DetailMock} onAddFavorite={spy} />);

    userEvent.click(screen.getByTestId('favorite-button'));

    expect(spy).toBeCalled();
  });

  it('should call removeFavorite if no is favorite', async () => {
    const spy = buildSpy();
    render(<Detail character={DetailMock} onRemoveFavorite={spy} isFavorite />);

    userEvent.click(screen.getByTestId('favorite-button'));

    expect(spy).toBeCalled();
  });

  it('should call onRefreshRequest', async () => {
    const spy = buildSpy();
    render(<Detail character={DetailMock} onRefreshRequest={spy} error={true} />);

    userEvent.click(screen.getByText(/click here to refresh request :\)/i));
    expect(spy).toHaveBeenCalled();
  });

  it('should call edit ', async () => {
    const spy = buildSpy();
    render(<Detail character={DetailMock} onSaveEdit={spy} />);

    userEvent.click(screen.getByTestId('edit-button'));

    userEvent.clear(screen.getByLabelText('Name'));
    userEvent.type(screen.getByLabelText('Name'), 'New Character');
    fireEvent.change(screen.getByLabelText('Gender'), {
      target: { value: 2 },
    });
    userEvent.clear(screen.getByLabelText('Real name'));
    userEvent.type(screen.getByLabelText('Real name'), 'Nome real');

    userEvent.type(screen.getByLabelText('Aliases'), 'O nome');
    userEvent.clear(screen.getByLabelText('Aliases'));

    userEvent.clear(screen.getByLabelText('Birth'));
    userEvent.type(screen.getByLabelText('Birth'), '10/10/20210');

    userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(expect(spy).toHaveBeenCalled()));
  });
});
