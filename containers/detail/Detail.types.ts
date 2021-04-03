import { CharacterDetailTypeResponse } from '../../store/ducks/types';

export interface DetailProps {
  character: CharacterDetailTypeResponse;
  loading: boolean;
  onGoBack?: () => void;
  error?: any;
  onRefreshRequest?: () => void;
}
