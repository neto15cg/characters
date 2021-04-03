import { combineReducers } from 'redux';
import { charactersReducer } from './characters';
import { favoriteCharactersReducer } from './favoriteCharactes';

export const rootReducer = combineReducers({
  characters: charactersReducer,
  favoriteCharacters: favoriteCharactersReducer,
});
