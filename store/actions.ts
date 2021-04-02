import { LoginDataTypes } from '../components/Login/Login.types';
import { actionTypes, LoginResponseTypes } from './store.types';

export function failure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
}

export function clearState() {
  return {
    type: actionTypes.CLEAR_STATE,
  };
}

export function doLogin(data: LoginDataTypes) {
  return { type: actionTypes.LOGIN_START, payload: data };
}

export function doLoginSuccess(data: LoginResponseTypes) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
}
