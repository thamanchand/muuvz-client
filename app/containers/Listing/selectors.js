import { createSelector } from 'reselect';
/**
 * VanListPage selector
 */

// VanListPage domain
export const selectVans = () => state => state.vanList;

export const makeSelectVans = () =>
  createSelector(
    selectVans,
    vanList => vanList.vanList,
  );
