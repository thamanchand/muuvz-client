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
    const getUniqueBookingId = uniqueBookingId();
    const payload = {...action.bookingPayload, bookingId: getUniqueBookingId};
    const bookingResponse = yield call(api.postResourceBooking, payload);
    if (bookingResponse) {
      yield put(push(`${'/listing/bookingconfirmation?'}${'bookingId='}${getUniqueBookingId}`));
      yield put(onBookingSuccess(bookingResponse));
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
