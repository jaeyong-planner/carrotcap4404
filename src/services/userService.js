import axios from 'axios';

const API_URL = '/api/v1/users/';

const getUserProfile = (userId) => {
  return axios.get(API_URL + userId);
};

const updateUserProfile = (userId, userData) => {
  return axios.patch(API_URL + userId, userData);
};

const userService = {
  getUserProfile,
  updateUserProfile,
};

export default userService;
