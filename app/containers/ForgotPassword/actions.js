import {
  ON_PASSWORD_FORGOT,
  ON_PASSWORD_FORGOT_SUCCESS,
  ON_PASSWORD_FORGOT_FAILED,
} from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onPasswordForgot = (payload) => ({
  type: ON_PASSWORD_FORGOT,
  payload,
});

export const onPasswordForgotSuccess = () => ({
  type: ON_PASSWORD_FORGOT_SUCCESS,
});

export const onPasswordForgotFailed = (error) => ({
  type: ON_PASSWORD_FORGOT_FAILED,
  error
});
