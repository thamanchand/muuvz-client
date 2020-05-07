/*
 *
 * AccountPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ON_PASSWORD_CHANGE,
  ON_PASSWORD_CHANGE_SUCCESS,
  ON_PASSWORD_CHANGE_FAILED,
} from './constant';


export const initialState = fromJS({

});

function accountPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_PASSWORD_CHANGE:
      return state;

    case ON_PASSWORD_CHANGE_SUCCESS:
      return state;

    case ON_PASSWORD_CHANGE_FAILED:
      return state
        .set('error', fromJS(action.error))

    default:
      return state;
  }
}

export default accountPageReducer;
