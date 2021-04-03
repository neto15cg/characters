import { CharactersState } from './characters';
import { FavoriteCharactersState } from './favoriteCharactes';

export interface RootState {
  characters: CharactersState;
  favoriteCharacters: FavoriteCharactersState;
}
