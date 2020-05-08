import { LOCATION_CHANGE } from 'react-router-redux';
import {
  call,
  takeLatest,
  take,
  put
} from 'redux-saga/effects';

import { postPassword } from './api';

// constants
import { ON_PASSWORD_FORGOT } from './constants';
import { onPasswordForgotSuccess, onPasswordForgotFailed} from './actions';

export function* onPasswordForgotWatcher(action) {
  console.log("Password forgot action", action);
  try {
    const response = yield call(postPassword, action.payload );
    if (response && response.ok === true) {
      yield put(onPasswordForgotSuccess());
    }
  } catch(error) {
    yield put(onPasswordForgotFailed(error));
    console.log(error.response.payload.message);

  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_PASSWORD_FORGOT, onPasswordForgotWatcher);
  yield take(LOCATION_CHANGE);
}
