import axios from 'axios';

const API_URL = '/api/v1/products/';

const getRecommendedProducts = () => {
  return axios.get(API_URL + 'recommended');
};

const getProduct = (id) => {
  return axios.get(API_URL + id);
};

const productService = {
  getRecommendedProducts,
  getProduct,
};

export default productService;
