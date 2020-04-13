import {
  ON_SEARCH,
  ON_SEARCH_SUCCESS,
  ON_SEARCH_FAILED,
} from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onSearch = (searchQuery) => ({
  type: ON_SEARCH,
  searchQuery,
});

export const onSearchSuccess = (searchResult) => ({
  type: ON_SEARCH_SUCCESS,
  searchResult,
});

export const onSearchFailed = (error) => ({
  type: ON_SEARCH_FAILED,
  error
});
