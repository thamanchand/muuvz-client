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
  onPasswordChangeSuccess,
  onPasswordChangeFailed,
} from './action';

import {
  ON_PASSWORD_CHANGE
} from './constant';

const baseURL = "http://localhost:1337/";

export function* onPasswordChangeWatcher(action) {
  const { password } = action.passPayload;
  const body = { password };
  try {
    const requestURL = `${baseURL}${'users'}/${action.userId}`;
    const response = yield call(request, requestURL, { method: 'put', body });
    console.log("password change response", response);
    if (response) {
      // update cookie
      yield call(auth.setToken, response.jwt);
      yield put(onPasswordChangeSuccess());
    }
  } catch(error) {
    yield put(onPasswordChangeFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_PASSWORD_CHANGE, onPasswordChangeWatcher);
}
