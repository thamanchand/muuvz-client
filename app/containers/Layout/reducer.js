import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
} from './constants';

const initialState = {
  show: false,
  collapse: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SIDEBAR_VISIBILITY:
      return { ...state, collapse: !state.collapse };
    case CHANGE_MOBILE_SIDEBAR_VISIBILITY:
      return { ...state, show: !state.show };
    default:
      return state;
  }
};

export default layoutReducer;
