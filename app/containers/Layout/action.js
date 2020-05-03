import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_SIDENAV_SELECTED,
} from './constants';

export function changeSidebarVisibility() {
  return {
    type: CHANGE_SIDEBAR_VISIBILITY,
  };
}

export function changeMobileSidebarVisibility(activeNav) {
  return {
    type: CHANGE_MOBILE_SIDEBAR_VISIBILITY,
    activeNav,
  };
}

export function changeSideNav(activeNav) {
  return {
    type: CHANGE_SIDENAV_SELECTED,
    activeNav,
  };
}
