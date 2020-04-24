import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';
// data api calls
export const getBookings = () => axios
  .get(`${BASE_URL}${'bookings'}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });
