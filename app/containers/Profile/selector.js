import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * ProfilePage
 */

// ProfilePage domain
export const selectProfileDomain = state => state.profilePage || initialState;

export const userProfileSelector = () =>
  createSelector(
    selectProfileDomain,
    subState => subState.get('userProfile').toJS()
  );
