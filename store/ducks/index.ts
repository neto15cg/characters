import { combineReducers } from 'redux';
import { charactersReducer } from './characters';
import { editedCharactersReducer } from './editedCharacters';
import { favoriteCharactersReducer } from './favoriteCharactes';

export const rootReducer = combineReducers({
  characters: charactersReducer,
  favoriteCharacters: favoriteCharactersReducer,
  editedCharacters: editedCharactersReducer,
});
