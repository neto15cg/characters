import axios from 'axios';

/**
 * EXPLANATION:
 *
 * I needed to create a proxy api, because was block requests by cors
 */

const api = axios.create({
  baseURL: 'https://proxy-api-challenge.herokuapp.com/',
});

export default api;
