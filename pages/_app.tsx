import { wrapper } from '../store/store';

function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
