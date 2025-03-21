import {
  ON_VANLIST_LOAD,
  ON_VANLIST_LOAD_SUCCESS,
  ON_VANLIST_LOAD_FAILURE,
  ON_VAN_SAVE,
  ON_VAN_SAVE_SUCCESS,
  ON_VAN_SAVE_FAILED,
  ON_PRICE_SAVE,
  ON_PRICE_SAVE_SUCCESS,
  ON_PRICE_SAVE_FAILED,
  ON_RESOURCE_DELETE,
  ON_RESOURCE_DELETE_SUCCESS,
  ON_RESOURCE_DELETE_FAILED,
  ON_PRICE_DELETE,
  ON_PRICE_DELETE_SUCCESS,
  ON_PRICE_DELETE_FAILED,
  ON_RESOURCE_COVER_DELETE,
  ON_RESOURCE_COVER_DELETE_SUCCESS,
  ON_RESOURCE_COVER_DELETE_FAILED,
  ON_VAN_INFO_UPDATE,
  ON_VAN_INFO_UPDATE_SUCCESS,
  ON_VAN_INFO_UPDATE_FAILED,
} from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onVanListLoad = () => ({
  type: ON_VANLIST_LOAD,
});

export const onVanListLoadSuccess = (vanList) => ({
  type: ON_VANLIST_LOAD_SUCCESS,
  vanList,
});

export const onVanListLoadFailure = (error) => ({
  type: ON_VANLIST_LOAD_FAILURE,
  error
});

export const onVanInfoSave = (vanInfo, pricePayload) => ({
  type: ON_VAN_SAVE,
  vanInfo,
  pricePayload,
});

export const onVanInfoSaveSuccess = (vanList) => ({
  type: ON_VAN_SAVE_SUCCESS,
  vanList,
});

export const onVanInfoSaveFailed = (error) => ({
  type: ON_VAN_SAVE_FAILED,
  error
});


export const onPriceInfoSave = () => ({
  type: ON_PRICE_SAVE,
});

export const onPriceInfoSaveSuccess = () => ({
  type: ON_PRICE_SAVE_SUCCESS
});

export const onPriceInfoSaveFailed = (error) => ({
  type: ON_PRICE_SAVE_FAILED,
  error
});


export const onResourceDelete = (resourceId) => ({
  type: ON_RESOURCE_DELETE,
  resourceId
});

export const onResourceDeleteSuccess = (deletedResourceId) => ({
  type: ON_RESOURCE_DELETE_SUCCESS,
  deletedResourceId,
});

export const onResourceDeleteFailed = (error) => ({
  type: ON_RESOURCE_DELETE_FAILED,
  error
});

export const onPriceDelete = (priceId) => ({
  type: ON_PRICE_DELETE,
  priceId
});

export const onPriceDeleteSuccess = () => ({
  type: ON_PRICE_DELETE_SUCCESS,
});

export const onPriceDeleteFailed = (error) => ({
  type: ON_PRICE_DELETE_FAILED,
  error
});


export const onResourceCoverDelete = (resourcePayload, coverId) => ({
  type: ON_RESOURCE_COVER_DELETE,
  resourcePayload,
  coverId,
});

export const onResourceCoverDeleteSuccess = () => ({
  type: ON_RESOURCE_COVER_DELETE_SUCCESS,
});

export const onResourceCoverDeleteFailed = (error) => ({
  type: ON_RESOURCE_COVER_DELETE_FAILED,
  error,
});


export const onVanInfoUpdate = (vanInfo, oldPriceList, newPriceList) => ({
  type: ON_VAN_INFO_UPDATE,
  vanInfo,
  oldPriceList,
  newPriceList
});

export const onVanInfoUpdateSuccess = (vanList, resourceId) => ({
  type: ON_VAN_INFO_UPDATE_SUCCESS,
  vanList,
  resourceId,
});

export const onVanInfoUpdateFailed = (error) => ({
  type: ON_VAN_INFO_UPDATE_FAILED,
  error
});
