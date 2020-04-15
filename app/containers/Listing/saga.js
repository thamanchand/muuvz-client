import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

// Utils
import request from 'utils/request';
import  history from '../../utils/history';

// constants
import {
  onSearchSuccess,
  onSearchFailed,
} from './actions';

import {
  ON_SEARCH,
} from './constants';

const baseURL = "http://localhost:1337/";

export function* searchResourceWatcher(action) {
  console.log("action", action);
  try {
    const requestURL = `${baseURL}${'resources'}`;
    const searchResult = yield call(request, requestURL, { method: 'GET' });
    if (searchResult) {
      yield put(onSearchSuccess(searchResult));
      yield call(forwardTo('/listing'))
    }
  } catch(error) {
    yield put(onSearchFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_SEARCH, searchResourceWatcher);
}

function forwardTo(location) {
  history.push(location);
}
