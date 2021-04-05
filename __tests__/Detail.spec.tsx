import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';

import { wrapper } from '../store';
import { mockAxios, userEvent } from '../utils/testHelper';
import { MockDetail } from './fixtures';
import DetailPage from '../pages/[pid]';

function Detail() {
  // @ts-ignore
  const store: any = useStore(state => state);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
      <DetailPage />
    </PersistGate>
  );
}

const DetailPageWithRedux = wrapper.withRedux(Detail);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/123',
      pathname: '',
      query: { pid: '123' },
      asPath: '',
    };
  },
}));

describe('DetailPage', () => {
  beforeEach(() => {
    mockAxios.get.mockImplementation(async () => {
      return {
        data: MockDetail,
      };
    });
  });

  it('should render the home page', async () => {
    // @ts-ignore
    render(<DetailPageWithRedux />);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('CHARACTERS')).toBeInTheDocument();
    expect(screen.queryAllByText('Lightning Lad')).toHaveLength(1);
  });

  it('should change to favorite and remove favorite', async () => {
    // @ts-ignore
    render(<DetailPageWithRedux />);
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

    userEvent.click(screen.getByTestId('favorite-button'));
    userEvent.click(screen.getByTestId('favorite-button'));
  });

  it('should edit personage and save', async () => {
    // @ts-ignore
    render(<DetailPageWithRedux />);
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

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
  });
});
