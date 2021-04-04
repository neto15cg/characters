import { CharactersResponse, EditedCharactersType, FavoriteCharacterType } from '../../store/ducks/types';

export interface HomeProps {
  characters: CharactersResponse;
  favoriteCharacters: FavoriteCharacterType[];
  currentPage: number;
  onMore?: (page: number, search?: string) => void;
  onNavigateToDetail?: (id: number) => void;
  onRefreshRequest?: () => void;
  editedCharacters?: EditedCharactersType[];
  loadingMore?: boolean;
  firstLoading?: boolean;
  error?: any;
}
