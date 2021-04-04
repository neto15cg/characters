import { Reducer } from 'redux';
import createReducer from '../../utils/reducer';
import { CharacterDetailType, EditedCharactersType } from './types';

export enum EditedCharactersTypes {
  AddEditedCharacters = '@Characters/AddEditedCharacters',
}

export type Actions = {
  AddEditedCharacters: {
    type: EditedCharactersTypes.AddEditedCharacters;
    payload: CharacterDetailType;
  };
};

export interface EditedCharactersState {
  data: {
    editedCharacters: EditedCharactersType[];
  };
}

export const InitialState: EditedCharactersState = {
  data: {
    editedCharacters: [],
  },
};

export const editedCharactersReducer: Reducer<EditedCharactersState> = createReducer(InitialState, {
  [EditedCharactersTypes.AddEditedCharacters](state: EditedCharactersState, action: Actions['AddEditedCharacters']) {
    const filteredEdit = state.data.editedCharacters.filter(character => character.id !== action.payload.id);
    state.data.editedCharacters = [
      ...filteredEdit,
      {
        name: action.payload.name,
        id: action.payload.id,
        real_name: action.payload.real_name,
        aliases: action.payload.aliases,
        birth: action.payload.birth,
        gender: action.payload.gender,
      },
    ];
    return state;
  },
});

export function addEditedCharacter(character: CharacterDetailType) {
  return dispatch => {
    dispatch({ type: EditedCharactersTypes.AddEditedCharacters, payload: character });
  };
}
