/*
 *
 * ResroucePage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ON_SEARCH,
  ON_SEARCH_SUCCESS,
  ON_SEARCH_FAILED,
} from './constants';


export const initialState = fromJS({
  searchResult: [],
  searchLoading: false,
});

function searchItemReducer(state = initialState, action) {
  switch (action.type) {
    case ON_SEARCH:
      return state
        .set('searchResult', fromJS([]))
        .set('searchLoading', true);

    case ON_SEARCH_SUCCESS:
      return state
        .set('searchResult', fromJS(action.searchResult))
        .set('isLoading', false);

    case ON_SEARCH_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('searchLoading', false)

    default:
      return state;
  }
}

export default searchItemReducer;
