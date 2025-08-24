import axios from 'axios';

const API_URL = '/api/v1/dashboard/';

const getDashboardData = () => {
  return axios.get(API_URL);
};

const dashboardService = {
  getDashboardData,
};

export default dashboardService;
