import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import HomePage from '../pages';
import { wrapper } from '../store';
import { useStore } from 'react-redux';
import { mockAxios, userEvent } from '../utils/testHelper';
import { HomeMock, MocKUrlList } from './fixtures';
import { SearchMock } from '../containers/search/__tests__/fixtures';

function Home() {
  // @ts-ignore
  const store: any = useStore(state => state);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
      <HomePage />
    </PersistGate>
  );
}

const HomePageWithRedux = wrapper.withRedux(Home);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('HomePage', () => {
  it('should render home page, search for a characters and filter by favorite', async () => {
    mockAxios.get.mockImplementation(async url => {
      if (url === MocKUrlList) {
        return {
          data: HomeMock,
        };
      }
      return {
        data: SearchMock,
      };
    });
    // @ts-ignore
    render(<HomePageWithRedux />);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('CHARACTERS')));
    await waitFor(() => expect(screen.getByText('Lightning Lad')));

    userEvent.type(screen.getByRole('textbox'), 'naruto');
    expect(screen.getByRole('textbox')).toHaveValue('naruto');

    // await ensureRender();
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(2));
    expect(screen.getByText(/Lightning Lad/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/See results/));
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(3));

    const select = screen.getByTestId('favorite-filter').querySelector('select');
    fireEvent.change(select, {
      target: { value: 'favorites' },
    });

    expect(screen.getByText(/We do not found characters by filter/i)).toBeInTheDocument();

    fireEvent.change(select, {
      target: { value: 'all' },
    });

    await waitFor(() => expect(screen.getByText(/Flashburn/i)));
  });
});
