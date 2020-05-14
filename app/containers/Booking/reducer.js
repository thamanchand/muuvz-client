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
  ON_RESOURCE_LOAD,
  ON_RESOURCE_LOAD_SUCCESS,
  ON_RESOURCE_LOAD_FAILED,
  ON_BOOKING_ACCEPT,
  ON_BOOKING_ACCEPT_SUCCESS,
  ON_BOOKING_ACCEPT_FAILED,
  ON_BOOKING_CANCEL,
  ON_BOOKING_CANCEL_SUCCESS,
  ON_BOOKING_CANCEL_FAILED
} from './constants';


export const initialState = fromJS({
  bookingResult: [],
  resourceList: [],
  loading: false,
  isBookingAcceptloading: false,
  selectedBookingId: null,
  isBookingCancelloading: false,
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

    case ON_RESOURCE_LOAD:
      return state
        .set('loading', true);

    case ON_RESOURCE_LOAD_SUCCESS:
      return state
        .set('resourceList', fromJS(action.resourceList))
        .set('isLoading', false);

    case ON_RESOURCE_LOAD_FAILED:
      return state.set('error', fromJS(action.error));

    case ON_BOOKING_ACCEPT:
      return state
        .set('isBookingAcceptloading', true)
        .set('selectedBookingId', fromJS(action.bookingId));

    case ON_BOOKING_ACCEPT_SUCCESS:
      return state
        .set('isBookingAcceptloading', false)
        .set('selectedBookingId', null);

    case ON_BOOKING_ACCEPT_FAILED:
      return state
        .set('isBookingAcceptloading', false)
        .set('selectedBookingId', null)
        .set('error', fromJS(action.error));

    case ON_BOOKING_CANCEL:
      return state
        .set('isBookingCancelloading', true)
        .set('selectedBookingId', fromJS(action.bookingId));

    case ON_BOOKING_CANCEL_SUCCESS:
      return state
        .set('isBookingCancelloading', false)
        .set('selectedBookingId', null);

    case ON_BOOKING_CANCEL_FAILED:
      return state
        .set('isBookingCancelloading', false)
        .set('selectedBookingId', null)
        .set('error', fromJS(action.error));;


    default:
      return state;
  }
}

export default resourceBookingReducer;
