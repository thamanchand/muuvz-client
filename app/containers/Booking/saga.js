import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

// Utils
// import  history from '../../utils/history';

// constants
import {
  onBookingLoadSuccess,
  onBookingLoadFailed,
  onResourceLoadSuccess,
  onResourceLoadFailed,
} from './action';

import * as api from './api';

import {
  ON_BOOKING_LOAD,
  ON_RESOURCE_LOAD,
} from './constants';

export function* onBookingLoadWatcher(action) {
  console.log("Booking load action", action);

  try {
    const bookingResult = yield call(api.getBookings);
    if (bookingResult) {
      yield put(onBookingLoadSuccess(bookingResult));
    }
  } catch(error) {
    yield put(onBookingLoadFailed(error));
  }
}

export function* onResourceLoadWatcher(action) {
  console.log("Resource load action", action);

  try {
    const resourceList = yield call(api.getResources);
    if (resourceList) {
      yield put(onResourceLoadSuccess(resourceList));
    }
  } catch(error) {
    yield put(onResourceLoadFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_BOOKING_LOAD, onBookingLoadWatcher);
  yield takeLatest(ON_RESOURCE_LOAD, onResourceLoadWatcher);
}
