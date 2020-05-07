import { fromJS } from 'immutable';

import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_SIDENAV_SELECTED,
  ON_USERPROFILE_LOAD,
  ON_USERPROFILE_LOAD_SUCCESS,
  ON_USERPROFILE_LOAD_FAILED,
} from './constants';

import auth from '../../utils/auth';

const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

export const initialState = fromJS({
  show: false,
  collapse: false,
  selected: isProfileCompleted ? 'Booking' : 'Profile',
  userProfile: [],
  error: null,
});

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SIDEBAR_VISIBILITY:
      return state.update('collapse', collapse => !collapse);

    case CHANGE_MOBILE_SIDEBAR_VISIBILITY:
      return state
        .update('show', show => !show)
        .set('selected', action.activeNav);

    case CHANGE_SIDENAV_SELECTED:
      return state.set('selected', action.activeNav);

    case ON_USERPROFILE_LOAD:
      return state;

    case ON_USERPROFILE_LOAD_SUCCESS:
      return state.set('userProfile', fromJS(action.userProfile));

    case ON_USERPROFILE_LOAD_FAILED:
      return state.set('error', fromJS(action.error));

    default:
      return state;
  }
};

export default layoutReducer;
