import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
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
    // For debug, add middle 'logger' import logger from 'redux-logger';

    return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  } else {
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'characters',
      whitelist: ['favoriteCharacters', 'editedCharacters'],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    // For debug, add middle 'logger' import logger from 'redux-logger';
    const store: any = createStore(persistedReducer, {}, bindMiddleware([thunkMiddleware]));

    store.__persistor = persistStore(store);

    return store;
  }
};

// @ts-ignore
export const wrapper = createWrapper(makeStore);
