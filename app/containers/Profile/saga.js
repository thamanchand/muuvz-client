import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

import auth from '../../utils/auth';
// import { userProfileSelector } from './selector';

// constants
import {
  onProfileSaveSuccess,
  onProfileSaveFailed,
  onProfileLoadSuccess,
  onProfileLoadFailed,
  onProfileEditSuccess,
  // onProfileEditFailed,
  onUserProfileDeleteSuccess,
  onUserProfileDeleteFailed,
} from './action';

import {
  ON_PROFILEPAGE_SAVE,
  ON_PROFILEPAGE_LOAD,
  ON_PROFILE_EDIT,
  ON_USERPROFILE_DELETE,
} from './constants';

import * as api from './api';

import toast from '../../shared/ToastNotify';

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
        toast.successfully("Your profile was created!");
        yield put(onProfileSaveSuccess(userProfile));
      }
    }
  } catch(error) {
    toast.error("Failed to create profile info!");
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
  const userId = auth.get('userInfo') && auth.get('userInfo').id;
  const isFileUploaded = action.profilePayload && action.profilePayload.files;

  const profileCompletePayload = {profileCompleted: true };

  try {
    if (isFileUploaded) {
      console.log("instance of file", isFileUploaded instanceof File)
      const data = new FormData();
      data.append('files', action.profilePayload.files[0]);
      data.append('refId', editPayload.id);
      data.append('ref', 'profile');
      data.append('field', 'avatar');

      const avatarUploadResponse = yield call(api.uploadProfileAvatar, data);

      console.log("avatarUploadResponse", avatarUploadResponse);
      const editProfileResponse = yield call(api.editUserProfile,  action.profileId, editPayload);
      console.log("editProfileResponse", editProfileResponse)

      // update user profileCompleted: true once profile is created
      const profileUpdateResponse = yield call(api.updateUserProfile, userId, profileCompletePayload);
      console.log("profileUpdateResponse", profileUpdateResponse)
      const { email, confirmed, profileCompleted, isbusiness, id } = profileUpdateResponse;
      const userFieldsLocallyStored = { email, confirmed, profileCompleted, isbusiness, id}

      if (avatarUploadResponse && editProfileResponse) {
        console.log("IF avatarUploadResponse && editProfileResponse")
        const userProfile = {
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
          avatar: {...avatarUploadResponse[0]},
        }
        console.log("Store userProfile", userProfile)
        yield call(auth.setUserInfo, userFieldsLocallyStored);
        yield put(onProfileEditSuccess(userProfile));
        toast.success("Profile info update successfully!");
      }
    } else {
      console.log("else")
      const editProfileResponse = yield call(api.editUserProfile,  action.profileId, editPayload);
      console.log("editProfileResponse", editProfileResponse)
      if (editProfileResponse) {
        const userProfile = {
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
        yield put(onProfileEditSuccess(userProfile));
        toast.success("Profile info update successfully!");
      }
    }

  } catch(error) {
    yield put(onUserProfileDeleteFailed(error));
    toast.error("Failed to update profile!");
  }

}

export function* avatarDeleteWatcher(action) {
  console.log("Avatar delete action", action);
  try {
    const deleteResponse = yield call(api.deleteProfileImage, action.avatarId);
    if (deleteResponse) {
      // const userId = auth.get('userInfo') && auth.get('userInfo').id;
      // const profileCompletePayload = { profileCompleted: false };
      // const profileUpdateResponse = yield call(api.updateUserProfile, userId, profileCompletePayload);
      // const { email, confirmed, profileCompleted, isbusiness, id } = profileUpdateResponse;
      // const userFieldsLocallyStored = { email, confirmed, profileCompleted, isbusiness, id}
      const profileApiResponse = yield call(api.getUserProfile, action.profileId);

      if (profileApiResponse ) {
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
          avatar: {},
        }
        console.log("aftre avatar delete userProfile status", userProfile)

        // yield call(auth.setUserInfo, userFieldsLocallyStored);
        yield put(onUserProfileDeleteSuccess());
        yield put(onProfileEditSuccess(userProfile));
        toast.success("Profile picture deleted successfully!")
        // yield call(forwardTo, '/dashboard/profile');
        yield put(push('/dashboard/profile'));
      }

    }
  } catch {
    yield put(onUserProfileDeleteFailed());
    toast.error("Failed to delete profile picture");
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_PROFILEPAGE_SAVE, profileSaveWatcher);
  yield takeLatest(ON_PROFILEPAGE_LOAD, profileLoadWatcher);
  yield takeLatest(ON_PROFILE_EDIT, profileEditWatcher);
  yield takeLatest(ON_USERPROFILE_DELETE, avatarDeleteWatcher)
}

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
//  */
// function forwardTo(location) {
//   history.push(location);
// }
