import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * VanListPage selector
 */

// VanListPage domain
export const selectLoginDomain = state => state.loginPage || initialState;

export const loginStateSelector = () =>
  createSelector(
    selectLoginDomain,
    subState => subState.get('isLoginLoading')
  );

export const loginErrorSelector = () =>
  createSelector(
    selectLoginDomain,
    subState => subState.get('error')
  );
