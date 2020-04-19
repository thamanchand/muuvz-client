import { initialState } from './reducer';

/**
 * Account page
 */

// ProfilePage domain
export const selectAccountPageDomain = state => state.accountPage || initialState;
