import { LOCATION_CHANGE } from 'react-router-redux';
import {
  call,
  takeLatest,
  take,
  put
} from 'redux-saga/effects';

// Utils
import request from 'utils/request';

// constants
import { ON_REGISTER_SUBMIT } from './constants';
import { onRegisterSuccess, onRegisterFailed} from './actions';

import toast from '../../shared/ToastNotify';

export function* registerFormWatcher(action) {
  try {
    const body = action.payload;
    const requestURL = 'http://localhost:1337/auth/local/register';
    const response = yield call(request, requestURL, { method: 'POST', body });
    if (response.jwt) {
      yield put(onRegisterSuccess());
      toast.success("Your account is created successfully! Please check your email.")
    }
  } catch(error) {
    yield put(onRegisterFailed(error));
    console.log(error.response.payload.message);

  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_REGISTER_SUBMIT, registerFormWatcher);
  yield take(LOCATION_CHANGE);
}

/*
requestURL = 'http://localhost:1337/auth/reset-password';
requestURL = 'http://localhost:1337/auth/forgot-password';
set(body, 'url', 'http://localhost:3000/auth/reset-password');
 */
