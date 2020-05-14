import {
  ON_SEARCH,
  ON_SEARCH_SUCCESS,
  ON_SEARCH_FAILED,
  ON_BOOKING,
  ON_BOOKING_SUCCESS,
  ON_BOOKING_FAILED
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

export const onBooking = (bookingPayload, resourceId) => ({
  type: ON_BOOKING,
  bookingPayload,
  resourceId,
});

export const onBookingSuccess = (bookingResult) => ({
  type: ON_BOOKING_SUCCESS,
  bookingResult,
});

export const onBookingFailed = (error) => ({
  type: ON_BOOKING_FAILED,
  error
});
