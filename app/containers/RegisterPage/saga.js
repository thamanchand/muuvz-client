import { LOCATION_CHANGE } from 'react-router-redux';
import {
  all,
  call,
  fork,
  takeLatest,
  take,
  cancel
} from 'redux-saga/effects';

// Utils
import auth from 'utils/auth';
import request from 'utils/request';
import  history from '../../utils/history';

// constants
import { ON_REGISTER_SUBMIT } from './constants';

export function* registerFormWatcher(action) {
  try {
    const body = action.payload;
    const requestURL = 'http://localhost:1337/auth/local/register';
    const response = yield call(request, requestURL, { method: 'POST', body });

    if (response.jwt) {
      // Set the user's credentials
      yield all([
        call(auth.setToken, response.jwt, body.rememberMe),
        call(auth.setUserInfo, response.user, body.rememberMe),
      ]);
      yield call(forwardTo, '/');
      const reisterWatcher = yield fork(takeLatest, ON_REGISTER_SUBMIT, registerFormWatcher);
      yield cancel(reisterWatcher);
    }
  } catch(error) {
    console.log(error.response.payload.message);
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_REGISTER_SUBMIT, registerFormWatcher);
  yield take(LOCATION_CHANGE);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}

/*
requestURL = 'http://localhost:1337/auth/reset-password';
requestURL = 'http://localhost:1337/auth/forgot-password';
set(body, 'url', 'http://localhost:3000/auth/reset-password');
 */
