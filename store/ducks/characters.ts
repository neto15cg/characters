import { Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import api from '../../services/api';
import createReducer from '../../utils/reducer';
import { RootState } from './state';

export enum CharactersTypes {
  ListCharactersStart = '@Characters/ListCharactersStart',
  ListCharactersSuccess = '@Characters/ListCharactersSuccess',
  ListCharactersFailure = '@Characters/ListCharactersFailure',
}

export type Actions = {
  ListCharactersStart: { type: CharactersTypes.ListCharactersStart };
  ListCharactersSuccess: {
    type: CharactersTypes.ListCharactersSuccess;
    payload: any;
  };
  ListCharactersFailure: {
    type: CharactersTypes.ListCharactersFailure;
    payload: any;
  };
};

export interface LoadingSection {
  'loading.list': boolean;
}

export interface CharactersState {
  data: {
    characters: any[];
  };

  loading: LoadingSection;
  error: any;
}

export const InitialState: CharactersState = {
  data: {
    characters: [],
  },
  loading: {
    'loading.list': false,
  },
  error: undefined,
};

export const charactersReducer: Reducer<CharactersState> = createReducer(InitialState, {
  [CharactersTypes.ListCharactersStart](state: CharactersState) {
    state.loading['loading.list'] = true;
    state.data.characters = [];
    return state;
  },
  [CharactersTypes.ListCharactersSuccess](state: CharactersState, action: Actions['ListCharactersSuccess']) {
    state.loading['loading.list'] = false;
    state.data.characters = action.payload;
    return state;
  },
  [CharactersTypes.ListCharactersFailure](state: CharactersState, action: Actions['ListCharactersFailure']) {
    state.loading['loading.list'] = false;
    state.error = action.payload;
    return state;
  },
});

export function listCharacters(): ThunkAction<Promise<any>, RootState, any, any> {
  return async (dispatch): Promise<any> => {
    dispatch({
      type: CharactersTypes.ListCharactersStart,
    });
    const url = 'characters/?api_key=79fb5af70ddd357a6dfd87aec0af52a814deee1f&format=json&limit=100&offset=100';
    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then((response: any) => {
          dispatch({
            type: CharactersTypes.ListCharactersSuccess,
            payload: response.data,
          });
          resolve(response);
        })
        .catch((err: any) => {
          dispatch({
            type: CharactersTypes.ListCharactersFailure,
            payload: err?.response?.data,
          });
          reject();
        });
    });
  };
}
