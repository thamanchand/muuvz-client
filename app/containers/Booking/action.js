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
/**
 * Sends the request to the API
 * @return {string}
 */
export const onBookingLoad = () => ({
  type: ON_BOOKING_LOAD,
});

export const onBookingLoadSuccess = (bookingResult) => ({
  type: ON_BOOKING_LOAD_SUCCESS,
  bookingResult,
});

export const onBookingLoadFailed = (error) => ({
  type: ON_BOOKING_LOAD_FAILED,
  error
});

export const onResourceLoad = () => ({
  type: ON_RESOURCE_LOAD,
});

export const onResourceLoadSuccess = (resourceList) => ({
  type: ON_RESOURCE_LOAD_SUCCESS,
  resourceList,
});

export const onResourceLoadFailed = (error) => ({
  type: ON_RESOURCE_LOAD_FAILED,
  error
});

export const onBookingAccept = (bookingId, resourceId) => ({
  type: ON_BOOKING_ACCEPT,
  bookingId,
  resourceId
});

export const onBookingAcceptSuccess = (resourceList) => ({
  type: ON_BOOKING_ACCEPT_SUCCESS,
  resourceList,
});

export const onBookingAcceptFailed = (error) => ({
  type: ON_BOOKING_ACCEPT_FAILED,
  error
});

export const onBookingCancel = (bookingId, resourceId) => ({
  type: ON_BOOKING_CANCEL,
  bookingId,
  resourceId
});

export const onBookingCancelSuccess = (resourceList) => ({
  type: ON_BOOKING_CANCEL_SUCCESS,
  resourceList,
});

export const onBookingCancelFailed = (error) => ({
  type: ON_BOOKING_CANCEL_FAILED,
  error
});
