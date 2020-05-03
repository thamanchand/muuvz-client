import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_SIDENAV_SELECTED,
} from './constants';

import auth from '../../utils/auth';

const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

const initialState = {
  show: false,
  collapse: false,
  selected: isProfileCompleted ? 'Booking' : 'Profile',
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SIDEBAR_VISIBILITY:
      return { ...state, collapse: !state.collapse };
    case CHANGE_MOBILE_SIDEBAR_VISIBILITY:
      return { ...state, show: !state.show };

    case CHANGE_SIDENAV_SELECTED:
      return { ...state, selected: action.activeNav };

    default:
      return state;
  }
};

export default layoutReducer;
