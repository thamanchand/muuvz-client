import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

// Utils
import request from 'utils/request';

import auth from '../../utils/auth';

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

const baseURL = "http://localhost:1337/";

export function* profileSaveWatcher(action) {
  console.log("Save action", action)

  const userId = auth.get('userInfo') && auth.get('userInfo').id;
  let body = {...action.profilePayload, user: userId};
  try {
    const requestURL = `${baseURL}${'profiles'}`;
    // const userProfile = yield call(request, requestURL, { method: 'GET' });
    const response = yield call(request, requestURL, { method: 'POST', body });
    console.log("Save response", response)
    if (response
      && action.profilePayload.businessName
      && action.profilePayload.phoneNumber
      && action.profilePayload.address) {
      body = {profileCompleted: true };
      // update user profileCompleted: true once profile is created
      const updateUserProfile = `${baseURL}${'users'}/${userId}`;
      // const userFieldsLocallyStored = { email, confirmed, profileCompleted, isbusiness}

      const updateResponse = yield call(request, updateUserProfile, { method: 'put', body });
      const { email, confirmed, profileCompleted, isbusiness, id } = updateResponse;
      const userFieldsLocallyStored = { email, confirmed, profileCompleted, isbusiness, id}
      const userProfile = {
        id: response.id,
        businessName: response.businessName,
        businessId: response.businessId,
        website: response.website,
        description: response.description,
        phoneNumber: response.phoneNumber,
        facebookLink: response.facebookLink,
        twitterLink: response.twitterLink,
        linkedinLink: response.linkedinLink,
        address: response.address,
      }
      // update userInfo cookie
      yield call(auth.setUserInfo, userFieldsLocallyStored);
      yield put(onProfileSaveSuccess(userProfile));
    }
  } catch(error) {
    yield put(onProfileSaveFailed(error));
  }
}

export function* profileLoadWatcher(action) {
  console.log("Load action", action)
  try {
    const requestURL = `${baseURL}${'users'}/${action.userId}`;
    const userAPIresponse = yield call(request, requestURL, { method: 'GET' });
    console.log("userAPIresponse", userAPIresponse)
    const { id } = userAPIresponse.profile;
    if (userAPIresponse) {

      const requestProfileURL = `${baseURL}${'profiles'}/${id}`;
      const response = yield call(request, requestProfileURL, { method: 'GET' });
      const userProfile = {
        id: response.id,
        businessName: response.businessName,
        businessId: response.businessId,
        website: response.website,
        description: response.description,
        phoneNumber: response.phoneNumber,
        facebookLink: response.facebookLink,
        twitterLink: response.twitterLink,
        linkedinLink: response.linkedinLink,
        address: response.address
      }
      console.log("userProfile", userProfile);
      if (response) {
        yield put(onProfileLoadSuccess(userProfile));
      }
    }
  } catch(error) {
    yield put(onProfileLoadFailed(error));
  }
}

export function* profileEditWatcher(action) {
  console.log("edit action", action);
  const body = {...action.profilePayload};
  try {
    const requestURL = `${baseURL}${'profiles'}/${action.profileId}`;
    const response = yield call(request, requestURL, { method: 'put', body });
    console.log("Edit response", response);
    if (response) {
      const userProfile = {
        id: response.id,
        businessName: response.businessName,
        businessId: response.businessId,
        website: response.website,
        description: response.description,
        phoneNumber: response.phoneNumber,
        facebookLink: response.facebookLink,
        twitterLink: response.twitterLink,
        linkedinLink: response.linkedinLink,
        address: response.address,
      }
      // update userInfo cookie
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
