/*
 *
 * AuthPage actions
 *
 */

import {
  ON_LOGIN_SUBMIT,
} from './constants';

/**
 * Sends the request to the API
 * @return {string}
 */
export const onLoginSubmit = (payload) => ({
  type: ON_LOGIN_SUBMIT,
  payload,
});
