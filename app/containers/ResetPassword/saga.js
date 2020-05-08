import { LOCATION_CHANGE } from 'react-router-redux';
import {
  call,
  takeLatest,
  take,
  put
} from 'redux-saga/effects';

// Utils

// constants
import { ON_PASSWORD_RESET } from './constants';

import { onPasswordResetSuccess, onPasswordResetFailed} from './actions';

import { resetPassword } from './api';

export function* passwordResetWatcher(action) {
  console.log("action", action)
  try {
    const response = yield call(resetPassword, action.payload );
    if (response.jwt) {
      yield put(onPasswordResetSuccess());
    }
  } catch(error) {
    yield put(onPasswordResetFailed(error));
    console.log(error.response.payload.message);

  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_PASSWORD_RESET, passwordResetWatcher);
  yield take(LOCATION_CHANGE);
}
