import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * ResourcePage selector
 */

export const selectVans = state => state.resourcePage || initialState;

export const makeSelectVans = () =>
  createSelector(
    selectVans,
    subState => subState.get('vanList')
  );
