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
} from './action';

import * as api from './api';

import {
  ON_BOOKING_LOAD,
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

export default function* defaultSaga() {
  yield takeLatest(ON_BOOKING_LOAD, onBookingLoadWatcher);
}

// function forwardTo(location) {
//   history.push(location);
// }
