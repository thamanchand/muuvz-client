import axios from 'axios';

const BASE_URL = 'http://localhost:1337/';

// Login user
export const loginUser = body => axios
  .post(
    `${BASE_URL}${'auth/local'}`,
    { ...body },
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

export const refreshToken = body => axios
  .post(
    `${BASE_URL}${'users-permissions/refreshToken'}`,
    { ...body },
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
