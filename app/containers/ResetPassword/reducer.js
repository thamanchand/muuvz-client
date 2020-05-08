/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ON_PASSWORD_RESET,
  ON_PASSWORD_RESET_SUCCESS,
  ON_PASSWORD_RESET_FAILED,
} from './constants';


export const initialState = fromJS({
  isPasswordReset: false,
  isPasswordResetting: false,
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_PASSWORD_RESET:
      return state
        .set('isPasswordReset', false)
        .set('isPasswordResetting', true);
      ;

    case ON_PASSWORD_RESET_SUCCESS:
      return state
        .set('isPasswordReset', true)
        .set('isPasswordRestting', false);

    case ON_PASSWORD_RESET_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isPasswordReset', false)
        .set('isPasswordResetting', false);

    default:
      return state;
  }
}

export default registerPageReducer;
