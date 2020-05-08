import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * ResetPage selector
 */

// ResetPage domain
export const selectResetPageDomain = state => state.resetPage || initialState;

export const isPasswordResetSelector = () =>
  createSelector(
    selectResetPageDomain,
    subState => subState.get('isPasswordReset')
  );

export const isPasswordResttingSelector = () =>
  createSelector(
    selectResetPageDomain,
    subState => subState.get('isPasswordResetting')
  );
