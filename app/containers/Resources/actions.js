import {
  ON_VANLIST_LOAD,
  ON_VANLIST_LOAD_SUCCESS,
  ON_VANLIST_LOAD_FAILURE,
  ON_VAN_SAVE,
  ON_VAN_SAVE_SUCCESS,
  ON_VAN_SAVE_FAILED,
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

export const onVanInfoSaveSuccess = () => ({
  type: ON_VAN_SAVE_SUCCESS
});

export const onVanInfoSaveFailed = (error) => ({
  type: ON_VAN_SAVE_FAILED,
  error
});
