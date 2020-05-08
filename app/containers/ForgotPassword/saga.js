import { LOCATION_CHANGE } from 'react-router-redux';
import {
  call,
  takeLatest,
  take,
  put
} from 'redux-saga/effects';

import { postPassword } from './api';

import toast from '../../shared/ToastNotify';

// constants
import { ON_PASSWORD_FORGOT } from './constants';
import { onPasswordForgotSuccess, onPasswordForgotFailed} from './actions';

export function* onPasswordForgotWatcher(action) {
  console.log("Password forgot action", action);
  try {
    const response = yield call(postPassword, action.payload );
    if (response && response.ok === true) {
      yield put(onPasswordForgotSuccess());
      toast.success("Please check your email!")
    }
  } catch(error) {
    toast.error("Failed to send email!")
    yield put(onPasswordForgotFailed(error));
    console.log(error.response.payload.message);

  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_PASSWORD_FORGOT, onPasswordForgotWatcher);
  yield take(LOCATION_CHANGE);
}
