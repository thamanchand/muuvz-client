import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';

// update resource status
export const updatePassword = (userId, payload) => axios
  .put(`${BASE_URL}${'users/'}${userId}`,
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
