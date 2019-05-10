import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * VanListPage selector
 */

// VanListPage domain
export const selectVans = state => state.listingPage || initialState;

export const makeSelectVans = () =>
  createSelector(
    selectVans,
    subState => subState.get('vanList')
  );
