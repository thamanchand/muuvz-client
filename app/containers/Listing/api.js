import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';

// get available bookings
export const getAvailableBookings = () => axios
  .get(`${BASE_URL}${'resources'}`, {
    headers: {
      'Accept': 'application/json',
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });

// post resource
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

// update resource status
export const editResource = (payload, resourceId) => axios
  .put(`${BASE_URL}${'resources/'}${resourceId}`,
    {...payload },
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }
  ).then(response => response.data).catch(err => {
    throw err;
  });
