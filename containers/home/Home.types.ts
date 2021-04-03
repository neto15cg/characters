import { CharactersResponse } from '../../store/ducks/types';

export interface HomeProps {
  characters: CharactersResponse;
  firstLoading: boolean;
}
