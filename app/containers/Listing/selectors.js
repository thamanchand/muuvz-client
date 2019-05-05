import { createSelector } from 'reselect';
/**
 * VanListPage selector
 */

// VanListPage domain
export const selectVanListDomain = () => state => state.vanList;

export const vanListSelector = () =>
  createSelector(
    selectVanListDomain,
    vanList => vanList.vanList,
  );
