import { Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Axios from 'axios';
import { baseURL } from '../../services/api';
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
  ChangePageList = '@Characters/PagePageList',
}

export type Actions = {
  ListCharactersStart: { type: CharactersTypes.ListCharactersStart };
  ListCharactersSuccess: { type: CharactersTypes.ListCharactersSuccess; payload: CharactersResponse };
  ListCharactersFailure: { type: CharactersTypes.ListCharactersFailure; payload: any };
  GetCharacterStart: { type: CharactersTypes.GetCharacterStart };
  GetCharacterSuccess: { type: CharactersTypes.GetCharacterSuccess; payload: CharacterDetailTypeResponse };
  GetCharacterFailure: { type: CharactersTypes.GetCharacterFailure; payload: any };
  ChangePageList: { type: CharactersTypes.ChangePageList; payload: number };
};

export interface LoadingSection {
  'loading.list': boolean;
  'loading.get': boolean;
}

export interface CharactersState {
  data: {
    currentPage: number;
    characters?: CharactersResponse;
    characterDetail?: CharacterDetailTypeResponse;
  };

  loading: LoadingSection;
  error: {
    characterDetail: any;
    characters: any;
  };
}

export const InitialState: CharactersState = {
  data: {
    characters: undefined,
    characterDetail: undefined,
    currentPage: 1,
  },
  loading: {
    'loading.list': false,
    'loading.get': false,
  },
  error: {
    characters: undefined,
    characterDetail: undefined,
  },
};

export const charactersReducer: Reducer<CharactersState> = createReducer(InitialState, {
  [CharactersTypes.ListCharactersStart](state: CharactersState) {
    state.error.characters = undefined;
    state.loading['loading.list'] = true;
    return state;
  },
  [CharactersTypes.ListCharactersSuccess](state: CharactersState, action: Actions['ListCharactersSuccess']) {
    state.loading['loading.list'] = false;
    if (!state.data.characters || action.payload.offset === 0) {
      state.data.characters = action.payload;
      return state;
    }
    const newCharacters: CharactersResponse = {
      ...state.data.characters,
      results: [...state.data.characters.results, ...action.payload.results],
    };
    state.data.characters = newCharacters;
    return state;
  },
  [CharactersTypes.ListCharactersFailure](state: CharactersState, action: Actions['ListCharactersFailure']) {
    state.loading['loading.list'] = false;
    state.error.characters = action.payload;
    return state;
  },
  [CharactersTypes.GetCharacterStart](state: CharactersState) {
    state.data.characterDetail = undefined;
    state.loading['loading.get'] = true;
    return state;
  },
  [CharactersTypes.GetCharacterSuccess](state: CharactersState, action: Actions['GetCharacterSuccess']) {
    state.loading['loading.get'] = false;
    state.error.characterDetail = undefined;
    state.data.characterDetail = action.payload;
    return state;
  },
  [CharactersTypes.GetCharacterFailure](state: CharactersState, action: Actions['GetCharacterFailure']) {
    state.loading['loading.get'] = false;
    state.error.characterDetail = action.payload;
    return state;
  },
  [CharactersTypes.ChangePageList](state: CharactersState, action: Actions['ChangePageList']) {
    state.data.currentPage = action.payload;
    return state;
  },
});

export function listCharacters(
  search?: string,
  page = 1,
  limit: number = 40,
): ThunkAction<Promise<any>, RootState, any, any> {
  return async (dispatch): Promise<any> => {
    const offset = page * limit - limit;
    dispatch({ type: CharactersTypes.ListCharactersStart });

    const url = `${baseURL}characters?limit=${limit}&offset=${offset}${search ? `&search=${search}` : ''}`;
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then(response => {
          dispatch({ type: CharactersTypes.ListCharactersSuccess, payload: response.data });
          dispatch({ type: CharactersTypes.ChangePageList, payload: page });
          resolve(response);
        })
        .catch(() => {
          dispatch({ type: CharactersTypes.ListCharactersFailure, payload: true });
          reject();
        });
    });
  };
}

export function getCharacter(characterId: string): ThunkAction<Promise<any>, RootState, any, any> {
  return async (dispatch): Promise<any> => {
    dispatch({ type: CharactersTypes.GetCharacterStart });
    const url = `${baseURL}character?id=${characterId}`;
    return new Promise((resolve, reject) => {
      Axios.get(url)
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
