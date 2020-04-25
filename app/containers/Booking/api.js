import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';

// get Bookings
export const getBookings = () => axios
  .get(`${BASE_URL}${'bookings'}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });

// get Resources
export const getResources = () => axios
  .get(`${BASE_URL}${'resources'}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });
