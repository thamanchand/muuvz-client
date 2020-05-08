import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Account page
 */

// AccountPage domain
export const selectAccountPageDomain = state => state.accountPage || initialState;

export const isPasswordChangedSelector = () =>
  createSelector(
    selectAccountPageDomain,
    subState => subState.get('isPasswordChange')
  );

export const isPasswordChangeLoadingSelector = () =>
  createSelector(
    selectAccountPageDomain,
    subState => subState.get('isPasswordChangeLoading')
  );
