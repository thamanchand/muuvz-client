import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Layout Page
 */

// Layout domain
export const selectLayoutDomain = state => state.LayoutPage || initialState;

export const userProfileSelector = () =>
  createSelector(
    selectLayoutDomain,
    subState => subState.get('userProfile').toJS()
  );

export const isSidebarCollapseSelector = () =>
  createSelector(
    selectLayoutDomain,
    subState => subState.get('collapse')
  );

export const isMobileSidebarSelector = () =>
  createSelector(
    selectLayoutDomain,
    subState => subState.get('show')
  );

export const selectedSideNavSelector = () =>
  createSelector(
    selectLayoutDomain,
    subState => subState.get('selected')
  );
