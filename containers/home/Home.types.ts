import { CharactersResponse, FavoriteCharacterType } from '../../store/ducks/types';

export interface HomeProps {
  characters: CharactersResponse;
  firstLoading: boolean;
  favoriteCharacters: FavoriteCharacterType[];
  currentPage: number;
  loadingMore: boolean;
  error?: any;
  onRefreshRequest?: () => void;
  onMore: (page: number) => void;
}
