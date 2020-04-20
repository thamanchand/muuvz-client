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
