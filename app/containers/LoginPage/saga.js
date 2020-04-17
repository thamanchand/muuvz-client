import { LOCATION_CHANGE } from 'react-router-redux';
import {
  all,
  call,
  put,
  takeLatest,
  take,
  cancel,
  fork
} from 'redux-saga/effects';

// Utils
import auth from 'utils/auth';
import request from 'utils/request';
import  history from '../../utils/history';

// constants
import { ON_LOGIN_SUBMIT } from './constants';

import { onLoginSubmitSuccess, onLoginSubmitFailed } from './actions';

export function* submitForm(action) {
  try {
    const body = action.payload;
    const requestURL = 'http://localhost:1337/auth/local';
    const response = yield call(request, requestURL, { method: 'POST', body });

    if (response.jwt) {
      // Set the user's credentials
      yield all([
        call(auth.setToken, response.jwt, body.rememberMe),
        call(auth.setUserInfo, response.user, body.rememberMe),
      ]);
      const isBusiness = auth.get('userInfo').isbusiness;
      const isProfileCompleted = auth.get('userInfo').profileCompleted;
      if (isBusiness && isProfileCompleted) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/dashboard/booking');
        const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
        yield cancel(submitWatcher);
      } else if (isBusiness && !isProfileCompleted) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/dashboard/profile');
        const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
        yield cancel(submitWatcher);
      } else {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/');
        const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
        yield cancel(submitWatcher);
      }

    }
  } catch(error) {
    yield put(onLoginSubmitFailed(error));
    console.log("error", error.response.payload.message);
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_LOGIN_SUBMIT, submitForm);
  yield take(LOCATION_CHANGE);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}
