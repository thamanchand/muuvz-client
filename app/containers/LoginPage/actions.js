/*
 *
 * AuthPage actions
 *
 */

import {
  ON_LOGIN_SUBMIT,
  ON_LOGIN_SUBMIT_SUCCESS,
  ON_LOGIN_SUBMIT_FAILED,
} from './constants';

/**
 * Sends the request to the API
 * @return {string}
 */
export const onLoginSubmit = (payload) => ({
  type: ON_LOGIN_SUBMIT,
  payload,
});

export const onLoginSubmitSuccess = () => ({
  type: ON_LOGIN_SUBMIT_SUCCESS,
});

export const onLoginSubmitFailed = (error) => ({
  type: ON_LOGIN_SUBMIT_FAILED,
  error,
});
