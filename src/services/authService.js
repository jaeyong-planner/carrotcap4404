import axios from 'axios';

const API_URL = '/api/v1/auth/';

const signup = (name, email, password) => {
  return axios.post(API_URL + 'signup', {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const forgotPassword = (email) => {
  return axios.post(API_URL + 'forgotPassword', { email });
};

const resetPassword = (token, password) => {
  return axios.patch(API_URL + `resetPassword/${token}`, { password });
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};


export default authService;
