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
  onVanInfoSaveSuccess,
  onVanInfoSaveFailed,
} from './actions';

import { ON_VANLIST_LOAD, ON_VAN_SAVE } from './constants';

export function* vanLoadWatcher() {
  try {
    const requestURL = 'http://localhost:1337/vans';
    const vanList = yield call(request, requestURL, { method: 'GET' });
    if (vanList) {
      yield put(onVanListLoadSuccess(vanList));
    }
  } catch(error) {
    yield put(onVanListLoadFailure(error));
  }
}

export function* vanInfoSaveWatcher(action) {
  console.log("vaninfosave", action);
  try {
    const requestURL = 'http://localhost:1337/vans';
    const body = action.payload;
    const response = yield call(request, requestURL, { method: 'POST', body });

    if (response) {
      yield put(onVanInfoSaveSuccess());
    }
  } catch(error) {
    yield put(onVanInfoSaveFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_VANLIST_LOAD, vanLoadWatcher);
  yield takeLatest(ON_VAN_SAVE, vanInfoSaveWatcher);
}
