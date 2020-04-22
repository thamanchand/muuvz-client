import {
  call,
  takeLatest,
  put,
  select,
} from 'redux-saga/effects';


import auth from '../../utils/auth';
import { userProfileSelector } from './selector';

// constants
import {
  onProfileSaveSuccess,
  onProfileSaveFailed,
  onProfileLoadSuccess,
  onProfileLoadFailed,
  onProfileEditSuccess,
  onProfileEditFailed,
} from './action';

import {
  ON_PROFILEPAGE_SAVE,
  ON_PROFILEPAGE_LOAD,
  ON_PROFILE_EDIT,
} from './constants';

import * as api from './api';

export function* profileSaveWatcher(action) {
  console.log("Save action", action)

  const userId = auth.get('userInfo') && auth.get('userInfo').id;
  const userProfilePayload = {...action.profilePayload, user: userId};
  try {
    const profilePostResponse = yield call(api.postUserProfile,  userProfilePayload);

    if (profilePostResponse) {
      const profileCompletePayload = {profileCompleted: true };

      // update user profileCompleted: true once profile is created
      const profileUpdateResponse = yield call(api.updateUserProfile, userId, profileCompletePayload);

      const { email, confirmed, profileCompleted, isbusiness, id } = profileUpdateResponse;
      const userFieldsLocallyStored = { email, confirmed, profileCompleted, isbusiness, id}

      // upload profile image
      // prepare upload formData
      const data = new FormData();
      data.append('files', action.profilePayload.files[0]);
      data.append('refId', profilePostResponse.id);
      data.append('ref', 'profile');
      data.append('field', 'avatar');

      // upload profile avatar
      const avatarUploadResponse = yield call(api.uploadProfileAvatar, data);
      // call get profile data
      const profileApiResponse = yield call(api.getUserProfile, profilePostResponse.id);

      const userProfile = {
        id: profileApiResponse.id,
        businessName: profilePostResponse.businessName,
        businessId: profileApiResponse.businessId,
        website: profileApiResponse.website,
        description: profileApiResponse.description,
        phoneNumber: profileApiResponse.phoneNumber,
        facebookLink: profileApiResponse.facebookLink,
        twitterLink: profileApiResponse.twitterLink,
        linkedinLink: profileApiResponse.linkedinLink,
        address: profileApiResponse.address,
        avatar: profileApiResponse.avatar,
      }
      if (avatarUploadResponse && profileUpdateResponse ) {
        // update userInfo cookie
        yield call(auth.setUserInfo, userFieldsLocallyStored);
        yield put(onProfileSaveSuccess(userProfile));
      }
    }
  } catch(error) {
    yield put(onProfileSaveFailed(error));
  }
}

export function* profileLoadWatcher(action) {
  console.log("Load prrofile action", action);

  try {
    const userAPIresponse = yield call(api.getUserInfo, action.userId);
    const { id } = userAPIresponse.profile;
    if (userAPIresponse) {

      const profileApiResponse = yield call(api.getUserProfile, id);
      const userProfile = {
        id: profileApiResponse.id,
        businessName: profileApiResponse.businessName,
        businessId: profileApiResponse.businessId,
        website: profileApiResponse.website,
        description: profileApiResponse.description,
        phoneNumber: profileApiResponse.phoneNumber,
        facebookLink: profileApiResponse.facebookLink,
        twitterLink: profileApiResponse.twitterLink,
        linkedinLink: profileApiResponse.linkedinLink,
        address: profileApiResponse.address,
        avatar: profileApiResponse.avatar,
      }
      if (userAPIresponse && profileApiResponse) {
        yield put(onProfileLoadSuccess(userProfile));
      }
    }
  } catch(error) {
    yield put(onProfileLoadFailed(error));
  }
}

export function* profileEditWatcher(action) {
  console.log("EDIT PRROFILE", action);

  const editPayload = {...action.profilePayload};

  const getUserProfile = yield select(userProfileSelector());
  const isFileUploaded = action.profilePayload.files[0];
  const avatarId = getUserProfile.avatar && getUserProfile.avatar.id;
  try {
    const editProfileResponse = yield call(api.editUserProfile,  action.profileId, editPayload);
    if (editProfileResponse) {
      let userProfile = {
        id: editProfileResponse.id,
        businessName: editProfileResponse.businessName,
        businessId: editProfileResponse.businessId,
        website: editProfileResponse.website,
        description: editProfileResponse.description,
        phoneNumber: editProfileResponse.phoneNumber,
        facebookLink: editProfileResponse.facebookLink,
        twitterLink: editProfileResponse.twitterLink,
        linkedinLink: editProfileResponse.linkedinLink,
        address: editProfileResponse.address,
        avatar: editProfileResponse.avatar,
      }

      if (isFileUploaded instanceof File && avatarId) {
        const deleteResponse = yield call(api.deleteProfileImage, editProfileResponse.avatar.id);

        if (deleteResponse) {
          const data = new FormData();
          data.append('files', action.profilePayload.files[0]);
          data.append('refId', editProfileResponse.id);
          data.append('ref', 'profile');
          data.append('field', 'avatar');

          const avatarUploadResponse = yield call(api.uploadProfileAvatar, data);
          if (avatarUploadResponse && deleteResponse) {
            userProfile = { ...userProfile, avatar: avatarUploadResponse[0]}
            yield put(onProfileEditSuccess(userProfile));
          }
        }
      } else {
        const data = new FormData();
        data.append('files', action.profilePayload.files[0]);
        data.append('refId', editProfileResponse.id);
        data.append('ref', 'profile');
        data.append('field', 'avatar');
        const avatarUploadResponse = yield call(api.uploadProfileAvatar, data);
        if (avatarUploadResponse) {
          yield put(onProfileEditSuccess(userProfile));
        }
      }
      yield put(onProfileEditSuccess(userProfile));
    }
  } catch(error) {
    yield put(onProfileEditFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_PROFILEPAGE_SAVE, profileSaveWatcher);
  yield takeLatest(ON_PROFILEPAGE_LOAD, profileLoadWatcher);
  yield takeLatest(ON_PROFILE_EDIT, profileEditWatcher);
}
