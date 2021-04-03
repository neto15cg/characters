import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';
import { wrapper } from '../store';
import '../reset.css';

function App({ Component, pageProps }: any) {
  // @ts-ignore
  const store: any = useStore(state => state);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(App);
