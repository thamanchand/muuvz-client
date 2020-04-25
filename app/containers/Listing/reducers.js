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
  ON_BOOKING,
  ON_BOOKING_SUCCESS,
  ON_BOOKING_FAILED,
} from './constants';


export const initialState = fromJS({
  searchResult: [],
  searchLoading: false,
  isBooked: false,
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

    case ON_BOOKING:
      return state
        .set('isBooked', true);

    case ON_BOOKING_SUCCESS:
      return state
        .set('isBooked', false);

    case ON_BOOKING_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isBooked', false)

    default:
      return state;
  }
}

export default searchItemReducer;
