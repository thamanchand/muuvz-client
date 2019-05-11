import {
  ON_VANLIST_LOAD,
  ON_VANLIST_LOAD_SUCCESS,
  ON_VANLIST_LOAD_FAILURE,
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
