import {
  ON_BOOKING_LOAD,
  ON_BOOKING_LOAD_SUCCESS,
  ON_BOOKING_LOAD_FAILED
} from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */
export const onBookingLoad = (bookingPayload) => ({
  type: ON_BOOKING_LOAD,
  bookingPayload,
});

export const onBookingLoadSuccess = (bookingResult) => ({
  type: ON_BOOKING_LOAD_SUCCESS,
  bookingResult,
});

export const onBookingLoadFailed = (error) => ({
  type: ON_BOOKING_LOAD_FAILED,
  error
});
