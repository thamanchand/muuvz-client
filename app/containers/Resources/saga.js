import {
  call,
  takeLatest,
  put,
  all,
} from 'redux-saga/effects';

// constants
import {
  onVanListLoadSuccess,
  onVanListLoadFailure,
  onVanInfoSaveSuccess,
  onVanInfoSaveFailed,
  onResourceDeleteSuccess,
  onResourceDeleteFailed,
  onPriceDeleteSuccess,
  onPriceDeleteFailed,
  onResourceCoverDeleteSuccess,
  onResourceCoverDeleteFailed,
  onVanInfoUpdateSuccess,
  onVanInfoUpdateFailed,
} from './actions';

import {
  ON_VANLIST_LOAD,
  ON_VAN_SAVE,
  ON_RESOURCE_DELETE,
  ON_PRICE_DELETE,
  ON_RESOURCE_COVER_DELETE,
  ON_VAN_INFO_UPDATE,
} from './constants';

// import { filterInt } from '../utils';

import auth from '../../utils/auth';
import request from '../../utils/request';
import { randomHsl } from '../utils';

import * as api from './api';

import toast from '../../shared/ToastNotify';

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
    const resourcePayload = { ...vanInfo, fueltype: vanInfo.fueltype.label, transmission: vanInfo.transmission.label, user: loggedUserId, status: 'Available', color: randomHsl() };

    const vanList = yield call(api.postResource,  resourcePayload);
    if (vanList) {
      const { id } = vanList;
      // insert price to pricing table
      const priceReponse = yield all(pricePayload.map(priceItem => call(
        api.postPricing,
        {
          price: priceItem.price,
          unit: priceItem.unit,
          resource: id,
          perhrdayweek: priceItem.perhrdayweek,
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
        const getNewResource = yield call(api.getResource, id);

        toast.success("Van info added successfully!")
        yield put(onVanInfoSaveSuccess(getNewResource));
      }
    }
  } catch(error) {
    toast.error("Failed to add van info!")
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
      toast.success("Van info deleted successfully!");
      yield put(onResourceDeleteSuccess(deletedResourceId));
    }
  } catch(error) {
    toast.error("Failed to delete van record!");
    yield put(onResourceDeleteFailed(error));
  }
};

export function* onPriceDeleteWatcher(action) {
  console.log("Price delete action", action);

  try {
    const deleteResponse = yield call(api.deletePricing, action.priceId);
    console.log("deleteResponse", deleteResponse)
    if (deleteResponse) {
      toast.success("Price info deleted!")
      yield put(onPriceDeleteSuccess());
    }
  } catch(error) {
    toast.error("Failed to delete price info!")
    yield put(onPriceDeleteFailed(error));
  }
}

export function* resourceCoverDeleteWatcher(action) {
  console.log("Resource delete action", action);
  const { resourcePayload, coverId } = action;
  const resourceId = action.resourcePayload.id;
  try {
    console.log("resourcePayload", resourcePayload);
    console.log("resourceId", resourceId);
    const newResourcePayload = {...resourcePayload, cover: [...resourcePayload.cover]};
    console.log("newResourcePayload", newResourcePayload)
    const updateResource = yield call(api.updateResource, newResourcePayload, resourceId);
    if (updateResource) {
      console.log("updateResource", updateResource);
      const deleteResponse = yield call(api.deleteResourceCoverPicture, coverId);
      if (deleteResponse) {
        console.log("deleteResponse", deleteResponse)
        const vanList = yield call(api.getResources);

        if(vanList && updateResource) {
          console.log("vanList", vanList);
          yield put(onResourceCoverDeleteSuccess());
          yield put(onVanListLoadSuccess(vanList));
          toast.success('Cover picture delete successfully!');
        }
      }
    }

  } catch(error) {
    yield put(onResourceCoverDeleteFailed(error));
    toast.error('Failed to delete cover picture!');
  }
}

export function* vanInfoUpdateWatcher(action) {
  console.log("Resource update action", action);
  const { vanInfo, oldPriceList, newPriceList } = action;
  const { id } = vanInfo;

  console.log("update Resource", vanInfo);
  try {
    // Prepare resource post payload
    const resourcePayload = { ...vanInfo, fueltype: vanInfo.fueltype.label, transmission: vanInfo.transmission.label, };
    const vanList = yield call(api.updateResource,  resourcePayload, id);
    console.log("updated resource", vanList)
    if (vanList) {
      if (newPriceList && newPriceList.length > 0) {

        // insert price to pricing table
        const priceInsertReponse = yield all(newPriceList.map(priceItem => call(
          api.postPricing,
          {
            price: priceItem.price,
            unit: priceItem.unit,
            resource: id,
            priceItem: priceItem.perhrdayweek
          }
        )));
        console.log("priceInsertReponse", priceInsertReponse)
      }
      if (oldPriceList && oldPriceList.length > 0) {
        // update price record
        const priceUpdateReponse = yield all(oldPriceList.map(priceItem => {
          const priceId = priceItem.id;
          return call(
            api.updatePricingRecord,
            {
              price: priceItem.price,
              unit: priceItem.unit,
              priceItem: priceItem.perhrdayweek,
              ...priceItem
            },
            priceId
          )
        }));
        console.log("priceUpdateReponse", priceUpdateReponse)
      }

      const isFileUploaded = action.vanInfo && action.vanInfo.files;
      if (isFileUploaded) {
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
        console.log("coverUploadResponse", coverUploadResponse);
      }

      const getUpadtedResource = yield call(api.getResource, id);
      if (getUpadtedResource) {
        console.log("----getUpadtedResource----", getUpadtedResource);
        toast.success("Van info updated successfully!")
        yield put(onVanInfoUpdateSuccess(getUpadtedResource, id));
      }
    }
  } catch(error) {
    toast.error("Failed to add van info!")
    yield put(onVanInfoUpdateFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(ON_VANLIST_LOAD, vanLoadWatcher);
  yield takeLatest(ON_VAN_SAVE, vanInfoSaveWatcher);
  yield takeLatest(ON_RESOURCE_DELETE, vanResourceDeleteWatcher);
  yield takeLatest(ON_PRICE_DELETE, onPriceDeleteWatcher);
  yield takeLatest(ON_RESOURCE_COVER_DELETE, resourceCoverDeleteWatcher);
  yield takeLatest(ON_VAN_INFO_UPDATE, vanInfoUpdateWatcher);
}
