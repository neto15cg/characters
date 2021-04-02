import { HYDRATE } from 'next-redux-wrapper';
import { LoginResponseTypes, ActionDataType, actionTypes } from './store.types';

export interface LoginStateProps {
  loading: boolean;
  error: unknown;
  login?: LoginResponseTypes;
}

const initialState: LoginStateProps = {
  loading: false,
  error: false,
  login: undefined,
};

function reducer(state: LoginStateProps, action: ActionDataType) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ login: action.payload },
        loading: false,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        ...{ error: action.payload },
        loading: false,
      };
    case actionTypes.CLEAR_STATE:
      return { ...initialState };
    default:
      return state;
  }
}

export default reducer;
