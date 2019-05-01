import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
} from './constants';

export function changeSidebarVisibility() {
  return {
    type: CHANGE_SIDEBAR_VISIBILITY,
  };
}

export function changeMobileSidebarVisibility() {
  return {
    type: CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  };
}
