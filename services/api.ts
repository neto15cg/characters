import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proxy-api-challenge.herokuapp.com/',
});

export default api;
