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
import { filterInt } from '../utils';

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
  const { vanInfo, pricePayload } = action;
  try {
    const requestURL = 'http://localhost:1337/vans';
    let body = vanInfo;
    const response = yield call(request, requestURL, { method: 'POST', body });

    if (response) {
      const { id } = response;
      const pricingRequestURL = 'http://localhost:1337/pricings';

      // prepare price payload
      body = pricePayload.map((item) => ({
        price: filterInt(item.price),
        unit: filterInt(item.unit),
        van: id,
      }));
      const priceReponse = yield call(request, pricingRequestURL, { method: 'POST', body });
      if (priceReponse) {
        yield put(onVanInfoSaveSuccess());
      }
    }
  } catch(error) {
    yield put(onVanInfoSaveFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_VANLIST_LOAD, vanLoadWatcher);
  yield takeLatest(ON_VAN_SAVE, vanInfoSaveWatcher);
}
