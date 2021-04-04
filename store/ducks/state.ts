import { CharactersState } from './characters';
import { EditedCharactersState } from './editedCharacters';
import { FavoriteCharactersState } from './favoriteCharactes';

export interface RootState {
  characters: CharactersState;
  favoriteCharacters: FavoriteCharactersState;
  editedCharacters: EditedCharactersState;
}
