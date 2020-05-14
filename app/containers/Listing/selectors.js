import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * VanListPage selector
 */

// VanListPage domain
export const selectResourceDomain = state => state.listingPage || initialState;

export const selectResourcesSelector = () =>
  createSelector(
    selectResourceDomain,
    subState => subState.get('searchResult').toJS()
  );

export const isSearchLoadingSelector = () =>
  createSelector(
    selectResourceDomain,
    subState => subState.get('searchLoading')
  );

export const isBookedSelector = () =>
  createSelector(
    selectResourceDomain,
    subState => subState.get('isBooked')
  );

export const selectedResourceIdSelector = () =>
  createSelector(
    selectResourceDomain,
    subState => subState.get('selectedResourceId')
  );
