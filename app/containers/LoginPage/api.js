import axios from 'axios';

const BASE_URL = 'http://localhost:1337/auth/local';

// Login user
export const loginUser = body => axios
  .post(
    BASE_URL,
    { ...body },
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
