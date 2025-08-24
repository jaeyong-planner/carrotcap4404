import axios from 'axios';

const API_URL = '/api/v1/reviews/';

const createReview = (productId, userId, rating, comment) => {
  return axios.post(API_URL, {
    productId,
    userId,
    rating,
    comment,
  });
};

const getAllReviews = () => {
  return axios.get(API_URL);
};

const getReview = (id) => {
  return axios.get(API_URL + id);
};

const updateReview = (id, rating, comment) => {
  return axios.patch(API_URL + id, {
    rating,
    comment,
  });
};

const deleteReview = (id) => {
  return axios.delete(API_URL + id);
};

const reviewService = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};

export default reviewService;
