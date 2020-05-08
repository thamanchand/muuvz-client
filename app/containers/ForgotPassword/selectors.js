import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Forgotpassword selector
 */

// VanListPage domain
export const selectForgotPasswordDomain = state => state.passwordForgotPage || initialState;

export const isPasswordSendSelector = () =>
  createSelector(
    selectForgotPasswordDomain,
    subState => subState.get('isPasswordSendToEmail')
  );

export const isLoadingSelector = () =>
  createSelector(
    selectForgotPasswordDomain,
    subState => subState.get('showLoader')
  );
