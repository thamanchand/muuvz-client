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
