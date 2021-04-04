import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { buildSpy, ensureRender, mockAxios, userEvent } from '../../../utils/testHelper';
import { SearchMock } from '../../search/__tests__/fixtures';
import Home from '../Home';
import { HomeCharactersMock, HomeEditedCharactersMock, HomeFavoriteCharactersMock } from './fixtures';

describe('HomeContainer', () => {
  beforeEach(() => {
    mockAxios.get.mockImplementation(async () => {
      return {
        status: 200,
        data: SearchMock,
        headers: {},
        config: {},
        statusText: 'ok',
      };
    });
  });

  it('should render HomeContainer', async () => {
    render(<Home characters={HomeCharactersMock} favoriteCharacters={[]} currentPage={1} />);

    await ensureRender();

    expect(screen.getByText(HomeCharactersMock.results[0].name)).toBeInTheDocument();
  });

  it('should call onRefreshRequest', async () => {
    const spy = buildSpy();
    render(<Home characters={undefined} error={true} favoriteCharacters={[]} currentPage={1} onRefreshRequest={spy} />);

    await ensureRender();
    userEvent.click(screen.getByText(/click here to refresh request :\)/i));
    expect(spy).toHaveBeenCalled();
  });

  it('should call onNavigateToDetail', async () => {
    const spy = buildSpy();
    render(<Home characters={HomeCharactersMock} favoriteCharacters={[]} currentPage={1} onNavigateToDetail={spy} />);

    userEvent.click(screen.getByTestId('Lightning Lad-card'));
    expect(spy).toHaveBeenCalled();
  });

  it('should render favorited characters and return to all', async () => {
    render(<Home characters={HomeCharactersMock} favoriteCharacters={HomeFavoriteCharactersMock} currentPage={1} />);
    await ensureRender();

    const select = screen.getByTestId('favorite-filter').querySelector('select');
    fireEvent.change(select, {
      target: { value: 'favorites' },
    });
    await ensureRender();

    expect(screen.getByText(/Naruto Uzumaki/i)).toBeInTheDocument();

    fireEvent.change(select, {
      target: { value: 'all' },
    });

    expect(screen.getByText(/Brainiac 5/i)).toBeInTheDocument();
  });
  it('should call onNavigate when click in search option', async () => {
    const spy = buildSpy();
    render(
      <Home
        characters={HomeCharactersMock}
        favoriteCharacters={HomeFavoriteCharactersMock}
        currentPage={1}
        onNavigateToDetail={spy}
      />,
    );

    userEvent.type(screen.getByTestId('input-search'), 'naruto');
    await ensureRender();

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(userEvent.click(screen.getByText(/Flash Thompson/i)));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call onMore when search characters and click a option and in see results and clear search', async () => {
    const spy = buildSpy();
    render(
      <Home
        characters={HomeCharactersMock}
        favoriteCharacters={HomeFavoriteCharactersMock}
        currentPage={1}
        onMore={spy}
      />,
    );

    userEvent.type(screen.getByTestId('input-search'), 'naruto');
    await ensureRender();

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(userEvent.click(screen.getByText(/See results/i)));

    expect(spy).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('input-btn-clear'));
  });

  it('should render editedCharacters', async () => {
    render(
      <Home
        characters={HomeCharactersMock}
        favoriteCharacters={HomeFavoriteCharactersMock}
        editedCharacters={HomeEditedCharactersMock}
        currentPage={1}
      />,
    );

    await ensureRender();

    expect(screen.getByText(/Raio da Silibrina/i)).toBeInTheDocument();
  });
});
