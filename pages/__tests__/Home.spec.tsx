import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import HomePage from '..';
import { wrapper } from '../../store';
import { useStore } from 'react-redux';
import { mockAxios } from '../../utils/testHelper';
import { HomeMock } from './fixtures';

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

describe('HomePage', () => {
  beforeEach(() => {
    mockAxios.get.mockImplementation(async () => ({
      data: HomeMock,
    }));
  });
  it('should render the home page', async () => {
    // @ts-ignore
    render(<HomePageWithRedux />);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('CHARACTERS')));
    await waitFor(() => expect(screen.getByText('Lightning Lad')));
  });
});
