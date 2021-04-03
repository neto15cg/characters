import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './ducks';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }): any => {
  if (isServer) {
    return createStore(rootReducer, bindMiddleware([thunkMiddleware, logger]));
  } else {
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'characters',
      whitelist: [],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store: any = createStore(persistedReducer, {}, bindMiddleware([thunkMiddleware, logger]));

    store.__persistor = persistStore(store);

    return store;
  }
};

// @ts-ignore
export const wrapper = createWrapper(makeStore);
