import { CharactersResponse, EditedCharactersType, FavoriteCharacterType } from '../../store/ducks/types';

export interface HomeProps {
  characters: CharactersResponse;
  firstLoading: boolean;
  favoriteCharacters: FavoriteCharacterType[];
  currentPage: number;
  loadingMore: boolean;
  onNavigateToDetail: (id: number) => void;
  error?: any;
  onMore: (page: number, search?: string) => void;
  onRefreshRequest?: () => void;
  editedCharacters?: EditedCharactersType[];
}
