/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ON_LOGIN_SUBMIT,
  ON_LOGIN_SUBMIT_SUCCESS,
  ON_LOGIN_SUBMIT_FAILED,
  ON_LOGINPAGE_LOAD,
} from './constants';


export const initialState = fromJS({
  isLoginLoading: false,
  error: null,
});

function connectLoginPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_LOGIN_SUBMIT:
      return state.set('isLoginLoading', false);

    case ON_LOGIN_SUBMIT_SUCCESS:
      return state.set('isLoginLoading', true);

    case ON_LOGIN_SUBMIT_FAILED:
      return state
        .set('error', action.error)
        .set('isLoginLoading', false);

    case ON_LOGINPAGE_LOAD:
      return state
        .set('error', null)

    default:
      return state;
  }
}

export default connectLoginPageReducer;
