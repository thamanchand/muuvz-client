import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

// Utils
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

import toast from '../../shared/ToastNotify';

import {
  ON_SEARCH,
  ON_BOOKING,
} from './constants';


export function* searchResourceWatcher(action) {
  console.log("Available Booking action", action);
  try {
    const searchResult = yield call(api.getAvailableBookings);
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
        toast.success("Your booking was made successfully!")
      }
    }

  } catch(error) {
    yield put(onBookingFailed(error));
    toast.error("Failed to make reservation!")
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_SEARCH, searchResourceWatcher);
  yield takeLatest(ON_BOOKING, onBookingWatcher);
}

function forwardTo(location) {
  history.push(location);
}
