import {
  ON_PASSWORD_RESET,
  ON_PASSWORD_RESET_SUCCESS,
  ON_PASSWORD_RESET_FAILED,
} from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onPasswordReset = (payload) => ({
  type: ON_PASSWORD_RESET,
  payload,
});

export const onPasswordResetSuccess = () => ({
  type: ON_PASSWORD_RESET_SUCCESS,
});

export const onPasswordResetFailed = (error) => ({
  type: ON_PASSWORD_RESET_FAILED,
  error
});
