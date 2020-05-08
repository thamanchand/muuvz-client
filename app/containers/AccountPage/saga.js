import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

// constants
import {
  onPasswordChangeSuccess,
  onPasswordChangeFailed,
} from './action';

import {
  ON_PASSWORD_CHANGE
} from './constant';

import { updatePassword } from './api';

export function* onPasswordChangeWatcher(action) {
  console.log("Change password action", action);
  try {
    const response = yield call(updatePassword, action.userId, action.passPayload);
    if (response) {
      yield put(onPasswordChangeSuccess());
    }
  } catch(error) {
    yield put(onPasswordChangeFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_PASSWORD_CHANGE, onPasswordChangeWatcher);
}
