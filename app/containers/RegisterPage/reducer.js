/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ON_REGISTER_SUBMIT,
  ON_REGISTER_SUBMIT_SUCCESS,
  ON_REGISTER_SUBMIT_FAILED,
  ON_REGISTERPAGE_LOAD,
} from './constants';


export const initialState = fromJS({
  isEmailRegistered: false,
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_REGISTER_SUBMIT:
      return state
        .set('isEmailRegistered', false)
        .set('error', null);
      ;

    case ON_REGISTER_SUBMIT_SUCCESS:
      return state.set('isEmailRegistered', true);

    case ON_REGISTER_SUBMIT_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isEmailRegistered', false);

    case ON_REGISTERPAGE_LOAD:
      return state
        .set('isEmailRegistered', false)
        .set('error', null);

    default:
      return state;
  }
}

export default registerPageReducer;
