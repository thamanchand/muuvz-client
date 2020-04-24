import {
  ON_PROFILEPAGE_LOAD,
  ON_PROFILEPAGE_LOAD_SUCCESS,
  ON_PROFILEPAGE_LOAD_FAILED,
  ON_PROFILEPAGE_SAVE,
  ON_PROFILEPAGE_SAVE_SUCCESS,
  ON_PROFILEPAGE_SAVE_FAILED,
  ON_PROFILE_EDIT,
  ON_PROFILE_EDIT_SUCCESS,
  ON_PROFILE_EDIT_FAILED,
  ON_USERPROFILE_DELETE,
  ON_USERPROFILE_DELETE_SUCCESS,
  ON_USERPROFILE_DELETE_FAILED,
} from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onProfileSave = (profilePayload) => ({
  type: ON_PROFILEPAGE_SAVE,
  profilePayload,
});

export const onProfileSaveSuccess = (userProfile) => ({
  type: ON_PROFILEPAGE_SAVE_SUCCESS,
  userProfile,
});

export const onProfileSaveFailed = (error) => ({
  type: ON_PROFILEPAGE_SAVE_FAILED,
  error
});

export const onProfileLoad = (userId) => ({
  type: ON_PROFILEPAGE_LOAD,
  userId,
});

export const onProfileLoadSuccess = (userProfile) => ({
  type: ON_PROFILEPAGE_LOAD_SUCCESS,
  userProfile,
});

export const onProfileLoadFailed = (error) => ({
  type: ON_PROFILEPAGE_LOAD_FAILED,
  error
});

export const onProfileEdit = (profileId, profilePayload) => ({
  type: ON_PROFILE_EDIT,
  profileId,
  profilePayload,
});

export const onProfileEditSuccess = (userProfile) => ({
  type: ON_PROFILE_EDIT_SUCCESS,
  userProfile,
});

export const onProfileEditFailed = (error) => ({
  type: ON_PROFILE_EDIT_FAILED,
  error
});

export const onUserProfileDelete = (avatarId, profileId) => ({
  type: ON_USERPROFILE_DELETE,
  avatarId,
  profileId,
});

export const onUserProfileDeleteSuccess = (userProfile) => ({
  type: ON_USERPROFILE_DELETE_SUCCESS,
  userProfile,
});

export const onUserProfileDeleteFailed = (error) => ({
  type: ON_USERPROFILE_DELETE_FAILED,
  error
});
