import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();


const BASE_URL = 'http://localhost:1337/';

// get Bookings
export const getBookings = (jwtToken) => axios
  .get(`${BASE_URL}${'bookings'}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });

// get Resources
export const getResources = (jwtToken) => axios
  .get(`${BASE_URL}${'resources'}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });

// update resource status
export const updateResource = (payload, resourceId) => axios
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

// update booking status
export const updateBooking = (payload, bookingId) => axios
  .put(`${BASE_URL}${'bookings/'}${bookingId}`,
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
