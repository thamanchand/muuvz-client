import axios from 'axios';

const BASE_URL = 'http://localhost:1337/auth/reset-password';

// post user profile
export const resetPassword = body => axios
  .post(
    BASE_URL,
    { ...body },
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
