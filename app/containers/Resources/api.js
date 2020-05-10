import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';

// post resource
export const postResource = body => axios
  .post(
    `${BASE_URL}${'resources'}`,
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
    `${BASE_URL}${'pricings'}`,
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
export const getResources = () => axios
  .get(`${BASE_URL}${'resources'}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });

// upload resource cover image
export const uploadResourceImages = data => axios
  .post(
    `${BASE_URL}${'upload'}`,
    data,
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

// delete resource
export const deleteResource = (resourceId) => axios
  .delete(
    `${BASE_URL}${resourceId}`,
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

// DELETE price
export const deletePricing = (pricingId) => axios
  .delete(
    `${BASE_URL}${'pricings/'}${pricingId}`,
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

// delete resource cover
export const deleteResourceCoverPicture = (coverId) => axios
  .delete(
    `${BASE_URL}${'upload/'}${'files'}${'/'}${coverId}`,
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
