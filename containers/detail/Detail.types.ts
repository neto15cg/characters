import { CharacterDetailType, CharacterDetailTypeResponse } from '../../store/ducks/types';

export interface DetailProps {
  character: CharacterDetailTypeResponse;
  loading?: boolean;
  onGoBack?: () => void;
  error?: any;
  onRefreshRequest?: () => void;
  isFavorite?: boolean;
  onAddFavorite?: (character: CharacterDetailTypeResponse) => void;
  onRemoveFavorite?: (character: CharacterDetailTypeResponse) => void;
  onSaveEdit?: (character: CharacterDetailType) => void;
}
