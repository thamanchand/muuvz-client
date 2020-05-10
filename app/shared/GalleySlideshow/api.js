import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';

// delete resource cover
export const deleteResourceCoverPicture = (coverId) => axios
  .delete(
    `${BASE_URL}${'files/'}${coverId}`,
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
