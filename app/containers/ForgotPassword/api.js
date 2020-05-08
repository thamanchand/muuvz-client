import axios from 'axios';

const BASE_URL = 'http://localhost:1337/auth/forgot-password';

// post user profile
export const postPassword = body => axios
  .post(
    BASE_URL,
    { ...body },
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
