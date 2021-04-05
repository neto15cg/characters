import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';

import { wrapper } from '../store';
import { mockAxios } from '../utils/testHelper';
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
});
