import {
  all,
  call,
  take,
  fork,
  takeLatest,
  put,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

// Utils
import auth from 'utils/auth';
import request from 'utils/request';
import { history } from '../../utils/history';

import { onLoginSubmitSuccess, onLoginSubmitFailed } from '../LoginPage/actions';

import toast from '../../shared/ToastNotify';

// Constants
import { LOG_USER } from './constants';

export function* login(action) {
  try {
    const requestURL = `http://localhost:1337/auth/${action.provider}/callback${action.search}`;
    const isLoggedFromListingPage = action.loginSource === 'listingPage';

    const response = yield call(request, requestURL, { method: 'GET' });
    if (response.jwt) {

      auth.clearToken();
      const { email, confirmed, profileCompleted, isbusiness, id } = response.user;
      const userFieldsLocallyStored = { email, confirmed, profileCompleted, isbusiness, id}
      // auth.clearAppStorage();

      // Set the user's credentials
      yield all([
        call(auth.setToken, response.jwt),
        call(auth.setUserInfo, userFieldsLocallyStored),
      ]);
      const isBusiness = auth.get('userInfo').isbusiness;
      const isProfileCompleted = auth.get('userInfo').profileCompleted;
      if (isLoggedFromListingPage) {
        toast.success("Logged in successfully!");
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, `${'/listing?loginSuccess'}`);
        // const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
      }
      else if (isBusiness && isProfileCompleted) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/dashboard/booking');
        toast.success("Logged in successfully!");
        const submitWatcher = yield fork(takeLatest, LOG_USER, login);
        yield cancel(submitWatcher);
      } else if (isBusiness && !isProfileCompleted) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/dashboard/profile');
        toast.success("Logged in successfully!");
        const submitWatcher = yield fork(takeLatest, LOG_USER, login);
        yield cancel(submitWatcher);
      } else if (!isBusiness && !isProfileCompleted) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/dashboard/profile');
        toast.success("Logged in successfully!");
        const submitWatcher = yield fork(takeLatest, LOG_USER, login);
        yield cancel(submitWatcher);
      } else if (!isLoggedFromListingPage && !isBusiness) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/');
        toast.success("Logged in successfully!");
        const submitWatcher = yield fork(takeLatest, LOG_USER, login);
        yield cancel(submitWatcher);
      }
    }
  } catch(error) {
    yield call(forwardTo, '/auth/login');
    yield put(onLoginSubmitFailed(error));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOG_USER, login);
  yield take(LOCATION_CHANGE);
  // yield cancel(loginWatcher);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {Sting} location The path to navigate
 */
function forwardTo(location) {
  history.push(location)
}
