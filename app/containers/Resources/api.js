import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

// post resource
export const postResources = body => axios
  .post(
    'http://localhost:1337/resources',
    { ...body },
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

// post pricing
export const postPricing = payload => axios
  .post(
    'http://localhost:1337/pricings',
    { ...payload },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    },
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

// data api calls
export const getResources = () => axios.get('http://localhost:1337/resources', {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}).then(response => response.data).catch(err => {
  throw err;
});
