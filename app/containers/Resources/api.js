import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

// post resource
export const postResources = data => axios
  .post(
    'http://localhost:1337/resource',

    { data,
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
