/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ON_PASSWORD_FORGOT,
  ON_PASSWORD_FORGOT_SUCCESS,
  ON_PASSWORD_FORGOT_FAILED,
  CLEAR_FORGOTPASSWORD_STATE,
} from './constants';


export const initialState = fromJS({
  isPasswordSendToEmail: false,
  showLoader: false,
});

function passForgotPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_PASSWORD_FORGOT:
      return state
        .set('isPasswordSendToEmail', false)
        .set('showLoader', true);

    case ON_PASSWORD_FORGOT_SUCCESS:
      return state
        .set('isPasswordSendToEmail', true)
        .set('showLoader', false);

    case ON_PASSWORD_FORGOT_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isPasswordSendToEmail', false)
        .set('showLoader', false);

    case CLEAR_FORGOTPASSWORD_STATE:
      return state
        .set('isPasswordSendToEmail', false);
    default:
      return state;
  }
}

export default passForgotPageReducer;
