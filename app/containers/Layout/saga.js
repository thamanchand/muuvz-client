import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

// constants
import {
  onProfileLoadSuccess,
  onProfileLoadFailed,
} from './action';

import {
  ON_USERPROFILE_LOAD,
} from './constants';

import { getUserInfo, getUserProfile } from '../Profile/api';

export function* profileLoadWatcher(action) {
  console.log("Layout Load profile action", action);

  try {
    const userAPIresponse = yield call(getUserInfo, action.userId);
    const { id } = userAPIresponse.profile;
    if (userAPIresponse) {

      const profileApiResponse = yield call(getUserProfile, id);
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

export default function* defaultSaga() {
  yield takeLatest(ON_USERPROFILE_LOAD, profileLoadWatcher);
}
