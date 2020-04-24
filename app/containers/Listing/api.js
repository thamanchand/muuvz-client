import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';

// post user profile
export const postResourceBooking = payload => axios
  .post(
    `${BASE_URL}${'bookings'}`,
    { ...payload },
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
