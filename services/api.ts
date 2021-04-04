import axios from 'axios';

/**
 * EXPLANATION:
 *
 * I needed to create a proxy api, because was block requests by cors
 */

export const baseURL = 'https://proxy-api-challenge.herokuapp.com/';

const api = axios.create({});

export default api;
