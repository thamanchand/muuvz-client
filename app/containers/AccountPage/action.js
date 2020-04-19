import {
  ON_PASSWORD_CHANGE,
  ON_PASSWORD_CHANGE_SUCCESS,
  ON_PASSWORD_CHANGE_FAILED,
} from './constant';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onPasswordChange = (userId, passPayload) => ({
  type: ON_PASSWORD_CHANGE,
  userId,
  passPayload,
});

export const onPasswordChangeSuccess = () => ({
  type: ON_PASSWORD_CHANGE_SUCCESS,
});

export const onPasswordChangeFailed = (error) => ({
  type: ON_PASSWORD_CHANGE_FAILED,
  error
});
