import { Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import api from '../../services/api';
import createReducer from '../../utils/reducer';
import { RootState } from './state';
import { CharacterDetailTypeResponse, CharactersResponse } from './types';

export enum CharactersTypes {
  ListCharactersStart = '@Characters/ListCharactersStart',
  ListCharactersSuccess = '@Characters/ListCharactersSuccess',
  ListCharactersFailure = '@Characters/ListCharactersFailure',
  GetCharacterStart = '@Characters/GetCharacterStart',
  GetCharacterSuccess = '@Characters/GetCharacterSuccess',
  GetCharacterFailure = '@Characters/GetCharacterFailure',
}

export type Actions = {
  ListCharactersStart: { type: CharactersTypes.ListCharactersStart };
  ListCharactersSuccess: { type: CharactersTypes.ListCharactersSuccess; payload: CharactersResponse };
  ListCharactersFailure: { type: CharactersTypes.ListCharactersFailure; payload: any };
  GetCharacterStart: { type: CharactersTypes.GetCharacterStart };
  GetCharacterSuccess: { type: CharactersTypes.GetCharacterSuccess; payload: CharacterDetailTypeResponse };
  GetCharacterFailure: { type: CharactersTypes.GetCharacterFailure; payload: any };
};

export interface LoadingSection {
  'loading.list': boolean;
  'loading.get': boolean;
}

export interface CharactersState {
  data: {
    characters?: CharactersResponse;
    characterDetail?: CharacterDetailTypeResponse;
  };

  loading: LoadingSection;
  error: any;
}

export const InitialState: CharactersState = {
  data: {
    characters: undefined,
    characterDetail: undefined,
  },
  loading: {
    'loading.list': false,
    'loading.get': false,
  },
  error: undefined,
};

export const charactersReducer: Reducer<CharactersState> = createReducer(InitialState, {
  [CharactersTypes.ListCharactersStart](state: CharactersState) {
    state.loading['loading.list'] = true;
    state.data.characters = undefined;
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
  [CharactersTypes.GetCharacterStart](state: CharactersState) {
    state.loading['loading.get'] = true;
    return state;
  },
  [CharactersTypes.GetCharacterSuccess](state: CharactersState, action: Actions['GetCharacterSuccess']) {
    state.loading['loading.get'] = false;
    state.data.characterDetail = action.payload;
    return state;
  },
  [CharactersTypes.GetCharacterFailure](state: CharactersState, action: Actions['GetCharacterFailure']) {
    state.loading['loading.get'] = false;
    state.error = action.payload;
  },
});

export function listCharacters(offset: number = 0, limit: number = 24): ThunkAction<Promise<any>, RootState, any, any> {
  return async (dispatch): Promise<any> => {
    dispatch({ type: CharactersTypes.ListCharactersStart });
    const url = `characters/?api_key=79fb5af70ddd357a6dfd87aec0af52a814deee1f&format=json&limit=${limit}&offset=${offset}`;
    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then(response => {
          dispatch({ type: CharactersTypes.ListCharactersSuccess, payload: response.data });
          resolve(response);
        })
        .catch(err => {
          dispatch({ type: CharactersTypes.ListCharactersFailure, payload: err?.response?.data });
          reject();
        });
    });
  };
}

export function getCharacter(characterId: string): ThunkAction<Promise<any>, RootState, any, any> {
  return async (dispatch): Promise<any> => {
    dispatch({ type: CharactersTypes.GetCharacterStart });
    const url = `character/${characterId}/?api_key=79fb5af70ddd357a6dfd87aec0af52a814deee1f&format=json`;
    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then(response => {
          dispatch({ type: CharactersTypes.GetCharacterSuccess, payload: response.data });
          resolve(response);
        })
        .catch(err => {
          dispatch({ type: CharactersTypes.GetCharacterFailure, payload: err?.response?.data });
          reject();
        });
    });
  };
}
