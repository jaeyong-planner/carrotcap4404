import axios from 'axios';

const API_URL = '/api/v1/';

const getSubscriptions = () => {
  return axios.get(API_URL + 'subscriptions');
};

const getSubscription = (id) => {
  return axios.get(API_URL + 'subscriptions/' + id);
};

const createSubscription = (data) => {
  return axios.post(API_URL + 'subscriptions', data);
};

const updateSubscription = (id, data) => {
  return axios.patch(API_URL + 'subscriptions/' + id, data);
};

const deleteSubscription = (id) => {
  return axios.delete(API_URL + 'subscriptions/' + id);
};

const getPayments = () => {
  return axios.get(API_URL + 'payments');
};

const createPayment = (data) => {
  return axios.post(API_URL + 'payments', data);
};

const subscriptionService = {
  getSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getPayments,
  createPayment,
};

export default subscriptionService;
