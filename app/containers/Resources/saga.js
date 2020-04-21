import {
  call,
  takeLatest,
  put,
  all,
} from 'redux-saga/effects';

import auth from '../../utils/auth';
import request from '../../utils/request';

// constants
import {
  onVanListLoadSuccess,
  onVanListLoadFailure,
  onVanInfoSaveSuccess,
  onVanInfoSaveFailed,
  onResourceDeleteSuccess,
  onResourceDeleteFailed,
} from './actions';

import {
  ON_VANLIST_LOAD,
  ON_VAN_SAVE,
  ON_RESOURCE_DELETE,
} from './constants';

// import { filterInt } from '../utils';

import * as api from './api';

export function* vanLoadWatcher() {
  try {
    const vanList = yield call(api.getResources);
    if (vanList) {
      yield put(onVanListLoadSuccess(vanList));
    }
  } catch(error) {
    yield put(onVanListLoadFailure(error));
  }
}

export function* vanInfoSaveWatcher(action) {
  console.log("vanSave action", action);
  const { vanInfo, pricePayload } = action;
  const loggedUserId = auth.get('userInfo').id;

  try {
    // Prepare resource post payload
    const resourcePayload = { ...vanInfo, fueltype: vanInfo.fueltype.label, user: loggedUserId };

    const vanList = yield call(api.postResources,  resourcePayload);
    if (vanList) {
      const { id } = vanList;
      // insert price to pricing table
      const priceReponse = yield all(pricePayload.map(priceItem => call(
        api.postPricing,
        {
          price: priceItem.price,
          unit: priceItem.unit,
          resource: id
        }
      )));

      // upload resource images
      const coverUploadResponse = yield all(vanInfo.files.map(avatarItem => {
        const data = new FormData();
        data.append('files', avatarItem);
        data.append('refId', id);
        data.append('ref', 'resource');
        data.append('field', 'cover');

        return call(
          api.uploadResourceImages,
          data
        );
      }));

      if (priceReponse && coverUploadResponse) {
        yield put(onVanInfoSaveSuccess(vanList));
      }
    }
  } catch(error) {
    yield put(onVanInfoSaveFailed(error));
  }
};

export function* vanResourceDeleteWatcher(action) {
  const { resourceId } = action;
  const requestURL = 'http://localhost:1337/resources';
  const deleteURL = `${requestURL}${'/'}${resourceId}`
  try {
    const deleteResponse = yield call(request, deleteURL, { method: 'DELETE' });
    const { id : deletedResourceId} = deleteResponse;
    if (deletedResourceId) {
      yield put(onResourceDeleteSuccess(deletedResourceId));
    }
  } catch(error) {
    yield put(onResourceDeleteFailed(error));
  }
};


export default function* defaultSaga() {
  yield takeLatest(ON_VANLIST_LOAD, vanLoadWatcher);
  yield takeLatest(ON_VAN_SAVE, vanInfoSaveWatcher);
  yield takeLatest(ON_RESOURCE_DELETE, vanResourceDeleteWatcher);
}
