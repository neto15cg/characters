import axios from 'axios';

const api = axios.create({
  baseURL: 'https://comicvine.gamespot.com/api/',
});

export default api;
