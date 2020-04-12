import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

// Utils
import request from 'utils/request';

// constants
import {
  onVanListLoadSuccess,
  onVanListLoadFailure,
} from './actions';

import { ON_VANLIST_LOAD } from './contants';

export function* vanLoadWatcher() {
  try {
    const requestURL = 'http://localhost:1337/resources';
    const vanList = yield call(request, requestURL, { method: 'GET' });
    if (vanList) {
      console.log("vanLIST", JSON.stringify(vanList, null, 2))
      yield put(onVanListLoadSuccess(vanList));
    }
  } catch(error) {
    yield put(onVanListLoadFailure(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_VANLIST_LOAD, vanLoadWatcher);
}
