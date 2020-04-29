import {
  ON_BOOKING_LOAD,
  ON_BOOKING_LOAD_SUCCESS,
  ON_BOOKING_LOAD_FAILED,
  ON_RESOURCE_LOAD,
  ON_RESOURCE_LOAD_SUCCESS,
  ON_RESOURCE_LOAD_FAILED,
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
