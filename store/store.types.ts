export interface LoginResponseTypes {
  id: string;
  username: string;
  password: string;
}

export interface ActionDataType {
  type: string;
  payload?: any;
}

export const actionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  CLEAR_STATE: 'CLEAR_STATE',
};
