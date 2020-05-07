import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_SIDENAV_SELECTED,
  ON_USERPROFILE_LOAD,
  ON_USERPROFILE_LOAD_SUCCESS,
  ON_USERPROFILE_LOAD_FAILED
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

export const onProfileLoad = (userId) => ({
  type: ON_USERPROFILE_LOAD,
  userId,
});

export const onProfileLoadSuccess = (userProfile) => ({
  type: ON_USERPROFILE_LOAD_SUCCESS,
  userProfile,
});

export const onProfileLoadFailed = (error) => ({
  type: ON_USERPROFILE_LOAD_FAILED,
  error
});
