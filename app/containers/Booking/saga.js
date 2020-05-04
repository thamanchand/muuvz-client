import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

import toast from '../../shared/ToastNotify';

// import  history from '../../utils/history';

// constants
import {
  onBookingLoadSuccess,
  onBookingLoadFailed,
  onResourceLoadSuccess,
  onResourceLoadFailed,
  onBookingAcceptSuccess,
  onBookingAcceptFailed,

} from './action';

import * as api from './api';

import {
  ON_BOOKING_LOAD,
  ON_RESOURCE_LOAD,
  ON_BOOKING_ACCEPT,
  ON_BOOKING_CANCEL,
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

export function* onBookingAcceptWatcher(action) {
  console.log("Booking accept action", action);
  const { resourceId, bookingId } = action;

  const resourceUpadatePayload = { status: 'Booked' };
  const bookingUpdatePayload = { status: 'Booked' };

  try {
    const updateResource = yield call(api.updateResource, resourceUpadatePayload, resourceId);
    const updateBooking = yield call(api.updateBooking, bookingUpdatePayload, bookingId);

    if (updateResource && updateBooking) {
      const bookingResult = yield call(api.getBookings);
      if (bookingResult) {
        yield put(onBookingLoadSuccess(bookingResult));
      }
      toast.success('Booking accepted');
      yield put(onBookingAcceptSuccess());
    }
  } catch(error) {
    yield put(onBookingAcceptFailed(error));
  }
}

export function* onBookingCancelWatcher(action) {
  console.log("Booking cancel action", action);
  const { resourceId, bookingId } = action;

  const resourceUpadatePayload = { status: 'Cancelled' };
  const bookingUpdatePayload = { status: 'Cancelled' };


  try {
    const updateResource = yield call(api.updateResource, resourceUpadatePayload, resourceId);
    const updateBooking = yield call(api.updateBooking, bookingUpdatePayload, bookingId);

    if (updateResource && updateBooking) {
      const bookingResult = yield call(api.getBookings);
      if (bookingResult) {
        yield put(onBookingLoadSuccess(bookingResult));
      }
      toast.error('Booking cancelled');
      yield put(onBookingAcceptSuccess());
    }
  } catch(error) {
    yield put(onBookingAcceptFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_BOOKING_LOAD, onBookingLoadWatcher);
  yield takeLatest(ON_RESOURCE_LOAD, onResourceLoadWatcher);
  yield takeLatest(ON_BOOKING_ACCEPT, onBookingAcceptWatcher);
  yield takeLatest(ON_BOOKING_CANCEL, onBookingCancelWatcher);
}
