import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * searchResultSelector
 */

// VanListPage domain
export const searchQuery = state => state.searchQuery || initialState;

export const searchResultSelector = () =>
  createSelector(
    searchQuery,
    subState => subState.get('searchResult').toJS()
  );
