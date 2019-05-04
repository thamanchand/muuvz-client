import { ON_REGISTER_SUBMIT } from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onRegisterSubmit = (payload) => ({
  type: ON_REGISTER_SUBMIT,
  payload,
});
