import { ON_REGISTER_SUBMIT,
  ON_REGISTER_SUBMIT_SUCCESS,
  ON_REGISTER_SUBMIT_FAILED,
  ON_REGISTERPAGE_LOAD,
} from './constants';
/**
 * Sends the request to the API
 * @return {string}
 */

export const onRegisterSubmit = (payload) => ({
  type: ON_REGISTER_SUBMIT,
  payload,
});

export const onRegisterSuccess = () => ({
  type: ON_REGISTER_SUBMIT_SUCCESS,
});

export const onRegisterFailed = (error) => ({
  type: ON_REGISTER_SUBMIT_FAILED,
  error
});

export const onRegisterPageLoad = () => ({
  type: ON_REGISTERPAGE_LOAD,
});
