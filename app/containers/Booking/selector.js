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
