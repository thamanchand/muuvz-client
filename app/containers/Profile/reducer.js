/*
 *
 * ResroucePage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ON_PROFILEPAGE_SAVE,
  ON_PROFILEPAGE_SAVE_SUCCESS,
  ON_PROFILEPAGE_SAVE_FAILED,
  ON_PROFILEPAGE_LOAD,
  ON_PROFILEPAGE_LOAD_SUCCESS,
  ON_PROFILEPAGE_LOAD_FAILED,
  ON_PROFILE_EDIT,
  ON_PROFILE_EDIT_SUCCESS,
  ON_PROFILE_EDIT_FAILED,
} from './constants';


export const initialState = fromJS({
  userProfile: [],
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_PROFILEPAGE_SAVE:
      return state;

    case ON_PROFILEPAGE_SAVE_SUCCESS:
      return state
        .set('userProfile', fromJS(action.userProfile));

    case ON_PROFILEPAGE_SAVE_FAILED:
      return state.set('error', fromJS(action.error))

    case ON_PROFILEPAGE_LOAD:
      return state
        .set('userProfile', fromJS([]));

    case ON_PROFILEPAGE_LOAD_SUCCESS:
      return state
        .set('userProfile', fromJS(action.userProfile));

    case ON_PROFILEPAGE_LOAD_FAILED:
      return state.set('error', fromJS(action.error))

    case ON_PROFILE_EDIT:
      return state;

    case ON_PROFILE_EDIT_SUCCESS:
      return state
        .set('userProfile', fromJS(action.userProfile));

    case ON_PROFILE_EDIT_FAILED:
      return state.set('error', fromJS(action.error))

    default:
      return state;
  }
}

export default profilePageReducer;
