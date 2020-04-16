import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * VanListPage selector
 */

// VanListPage domain
export const selectRegisterDomain = state => state.registerPage || initialState;

export const emailRegisteredSelector = () =>
  createSelector(
    selectRegisterDomain,
    subState => subState.get('isEmailRegistered')
  );


export const registerErrorSelector = () =>
  createSelector(
    selectRegisterDomain,
    subState => subState.get('error')
  );
