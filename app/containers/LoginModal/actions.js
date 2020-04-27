/*
 *
 * AuthPage actions
 *
 */

import {
  ON_LOGIN_SUBMIT,
  ON_LOGIN_SUBMIT_SUCCESS,
  ON_LOGIN_SUBMIT_FAILED,
  ON_LOGINPAGE_LOAD,
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

export const onLoginPageLoad = () => ({
  type: ON_LOGINPAGE_LOAD,
});
