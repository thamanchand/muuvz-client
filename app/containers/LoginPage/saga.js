import { LOCATION_CHANGE } from 'react-router-redux';
import {
  all,
  call,
  put,
  takeLatest,
  take,
  cancel,
  fork,
} from 'redux-saga/effects';
import request from 'utils/request';

// Utils
import auth from 'utils/auth';
import  { historyBooking } from '../../utils/history';
import toast from '../../shared/ToastNotify';

// constants
import { ON_LOGIN_SUBMIT } from './constants';

import { onLoginSubmitSuccess, onLoginSubmitFailed } from './actions';

export function* submitForm(action) {
  console.log("Login action");
  try {
    const body = action.payload;
    // find out if login source is from listing page
    const isLoggedFromListingPage = action.loginSource === 'listingPage';
    const loginURL = `${'http://localhost:1337/'}${'auth/local'}`;
    const response = yield call(request, loginURL, { method: 'POST', body });
    if (response.jwt) {
      auth.clearToken();
      const { email, confirmed, profileCompleted, isbusiness, id } = response.user;
      const userFieldsLocallyStored = { email, confirmed, profileCompleted, isbusiness, id}
      // auth.clearAppStorage();

      // Set the user's credentials
      yield all([
        call(auth.setToken, response.jwt,  body.rememberMe),
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
        const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
        yield cancel(submitWatcher);
      } else if (isBusiness && !isProfileCompleted) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/dashboard/profile');
        toast.success("Logged in successfully!");
        const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
        yield cancel(submitWatcher);
      } else if (!isBusiness && !isProfileCompleted) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/dashboard/profile');
        toast.success("Logged in successfully!");
        const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
        yield cancel(submitWatcher);
      } else if (!isLoggedFromListingPage && !isBusiness) {
        yield put(onLoginSubmitSuccess());
        yield call(forwardTo, '/');
        toast.success("Logged in successfully!");
        const submitWatcher = yield fork(takeLatest, ON_LOGIN_SUBMIT, submitForm);
        yield cancel(submitWatcher);
      }

    }
  } catch(error) {
    console.log("saga login error", JSON.stringify(error.response, null,2))
    yield put(onLoginSubmitFailed(error));
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
  historyBooking.push(location);
}
