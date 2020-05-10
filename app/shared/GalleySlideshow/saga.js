import {
  call,
  takeLatest,
  put,
} from 'redux-saga/effects';

// constants
import {
  onResourceCoverDeleteSuccess,
  onResourceCoverDeleteFailed,
} from './actions';

import {
  ON_RESOURDE_COVER_DELETE,
} from './constants';


import { deleteResourceCoverPicture } from './api';

import toast from '../ToastNotify';

export function* resourceCoverDeleteWatcher(action) {
  console.log("Resource delete action", action);

  try {
    const deleteResponse = yield call(deleteResourceCoverPicture, action.action.coverId);
    if (deleteResponse) {
      yield put(onResourceCoverDeleteSuccess());
      toast.success('Cover picture delete successfully!');
    }
  } catch(error) {
    yield put(onResourceCoverDeleteFailed(error));
    toast.error('Failed to delete cover picture!');
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_RESOURDE_COVER_DELETE, resourceCoverDeleteWatcher);
}
