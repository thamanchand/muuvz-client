/*
 *
 * Booking reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ON_BOOKING_LOAD,
  ON_BOOKING_LOAD_SUCCESS,
  ON_BOOKING_LOAD_FAILED,
} from './constants';


export const initialState = fromJS({
  bookingResult: [],
  loading: false,
});

function resourceBookingReducer(state = initialState, action) {
  switch (action.type) {
    case ON_BOOKING_LOAD:
      return state
        .set('loading', true);

    case ON_BOOKING_LOAD_SUCCESS:
      return state
        .set('bookingResult', fromJS(action.bookingResult))
        .set('isLoading', false);

    case ON_BOOKING_LOAD_FAILED:
      return state.set('error', fromJS(action.error))

    default:
      return state;
  }
}

export default resourceBookingReducer;
