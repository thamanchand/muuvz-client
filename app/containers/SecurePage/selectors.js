import { createSelector } from 'reselect';

/**
 * Direct selector to the securePage state domain
 */
const selectSecurePageDomain = state => state.securePage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by SecurePage
 */

const makeSelectSecurePage = () => createSelector(
  selectSecurePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSecurePage;
export {
  selectSecurePageDomain,
};
