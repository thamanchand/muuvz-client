import axios from 'axios';

import auth from '../../utils/auth';

const token = auth.getToken();

const BASE_URL = 'http://localhost:1337/';

// post user profile
export const postUserProfile = body => axios
  .post(
    `${BASE_URL}${'profiles'}`,
    { ...body },
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

// post user profile
export const updateUserProfile = (userId, payload) => axios
  .put(
    `${BASE_URL}${'users/'}${userId}`,
    { ...payload },
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });

// upload profile avatar
export const uploadProfileAvatar = data => axios
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

// get user info
export const getUserInfo = (userId) => axios
  .get(`${BASE_URL}${'users/'}${userId}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });

// get user info
export const getUserProfile = (profileId) => axios
  .get(`${BASE_URL}${'profiles/'}${profileId}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(response => response.data).catch(err => {
    throw err;
  });

// get user info
export const editUserProfile = (profileId, payload) => axios
  .put(`${BASE_URL}${'profiles/'}${profileId}`,
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

// delete resource
export const deleteProfileImage = (avatarId) => axios
  .delete(
    `${BASE_URL}${'upload/'}${'files'}${'/'}${avatarId}`,
    {headers: {
      'Authorization': `Bearer ${token}`
    }},
  ).then(response => response.data)
  .catch(error => {
    throw error;
  });
