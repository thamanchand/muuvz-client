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
} from './constants';


const initialState = fromJS({});

function connectLoginPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_LOGIN_SUBMIT:
      return state.set('isLoginLoading', false);

    case ON_LOGIN_SUBMIT_SUCCESS:
      return state.set('isLoginLoading', true);

    case ON_LOGIN_SUBMIT_FAILED:
      return state.set('error', fromJS(action.error)).set('isLoginLoading', false);

    default:
      return state;
  }
}

export default connectLoginPageReducer;
