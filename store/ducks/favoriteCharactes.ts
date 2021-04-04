import { Reducer } from 'redux';
import createReducer from '../../utils/reducer';
import { CharacterDetailTypeResponse, FavoriteCharacterType } from './types';

export enum FavoriteTypes {
  AddFavoriteCharacters = '@Characters/AddFavoriteCharacters',
  RemoveFavoriteCharacters = '@Characters/RemoveFavoriteCharacters',
}

export type Actions = {
  AddFavoriteCharacters: { type: FavoriteTypes.AddFavoriteCharacters; payload: CharacterDetailTypeResponse };
  RemoveFavoriteCharacters: { type: FavoriteTypes.RemoveFavoriteCharacters; payload: CharacterDetailTypeResponse };
};

export interface FavoriteCharactersState {
  data: {
    favoriteCharacters: FavoriteCharacterType[];
  };
}

export const InitialState: FavoriteCharactersState = {
  data: {
    favoriteCharacters: [],
  },
};

export const favoriteCharactersReducer: Reducer<FavoriteCharactersState> = createReducer(InitialState, {
  [FavoriteTypes.AddFavoriteCharacters](state: FavoriteCharactersState, action: Actions['AddFavoriteCharacters']) {
    state.data.favoriteCharacters = [
      ...state.data.favoriteCharacters,
      {
        id: action.payload.results.id,
        name: action.payload.results.name,
        image: action.payload.results.image,
      },
    ];
    return state;
  },
  [FavoriteTypes.RemoveFavoriteCharacters](
    state: FavoriteCharactersState,
    action: Actions['RemoveFavoriteCharacters'],
  ) {
    const filteredCharacters = state.data.favoriteCharacters.filter(
      character => character.id !== action.payload.results.id,
    );
    state.data.favoriteCharacters = filteredCharacters;
    return state;
  },
});

export function addFavoriteCharacter(character: CharacterDetailTypeResponse) {
  return (dispatch, getState) => {
    console.log('------------------------x', getState().characters);
    dispatch({ type: FavoriteTypes.AddFavoriteCharacters, payload: character });
  };
}

export function removeFavoriteCharacter(character: CharacterDetailTypeResponse) {
  return dispatch => {
    dispatch({ type: FavoriteTypes.RemoveFavoriteCharacters, payload: character });
  };
}
