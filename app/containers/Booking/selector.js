import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * VanListPage selector
 */

// VanListPage domain
export const selectBookingDomain = state => state.bookingPage || initialState;

export const selectBookingSelector = () =>
  createSelector(
    selectBookingDomain,
    subState => subState.get('bookingResult').toJS()
  );

export const resourceListSelector = () =>
  createSelector(
    selectBookingDomain,
    subState => subState.get('resourceList').toJS()
  );

export const isAcceptBookingLoadingSelector = () =>
  createSelector(
    selectBookingDomain,
    subState => subState.get('isBookingAcceptloading')
  );

export const selectedBookingIdSelector = () =>
  createSelector(
    selectBookingDomain,
    subState => subState.get('selectedBookingId')
  );
