import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

// Utils
import request from 'utils/request';
import  history from '../../utils/history';

// constants
import {
  onSearchSuccess,
  onSearchFailed,
  onBookingSuccess,
  onBookingFailed,
} from './actions';

import { uniqueBookingId } from '../utils';

import * as api from './api';

import { getUserInfo } from '../Profile/api';

import {
  ON_SEARCH,
  ON_BOOKING,
} from './constants';

const baseURL = "http://localhost:1337/";

export function* searchResourceWatcher(action) {
  console.log("action", action);
  try {
    const requestURL = `${baseURL}${'resources'}`;
    const searchResult = yield call(request, requestURL, { method: 'GET' });
    if (searchResult) {
      yield put(onSearchSuccess(searchResult));
      yield call(forwardTo('/listing'))
    }
  } catch(error) {
    yield put(onSearchFailed(error));
  }
}

export function* onBookingWatcher(action) {
  console.log("Booking action", action);

  try {
    // generate random booking number
    const getUniqueBookingId = uniqueBookingId();
    // get resource Id
    const resourceId = action.bookingPayload.resource;
    // get userId
    const userId = action.bookingPayload.user;
    const userApiResponse = yield call(getUserInfo, userId);

    if (userApiResponse) {
      // prepare booking POST payload
      const payload = {
        ...action.bookingPayload,
        bookingId: getUniqueBookingId,
        profile: userApiResponse.profile.id
      };
      // prepare payload to update resource
      const updateResourceResp = { status: 'Requested' };

      // call booking POST api
      const bookingResponse = yield call(api.postResourceBooking, payload);
      // call update resource api
      const updateResourceResponse = yield call(api.editResource, updateResourceResp, resourceId);
      if (bookingResponse && updateResourceResponse) {
        yield put(push(`${'/listing/bookingconfirmation?'}${'bookingId='}${getUniqueBookingId}`));
        yield put(onBookingSuccess(bookingResponse));
      }
    }

  } catch(error) {
    yield put(onBookingFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_SEARCH, searchResourceWatcher);
  yield takeLatest(ON_BOOKING, onBookingWatcher);
}

function forwardTo(location) {
  history.push(location);
}
