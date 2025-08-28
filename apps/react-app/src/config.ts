const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default {
  SERVER_URL,
  API_URL: SERVER_URL + '/api/articles',
  IMG_URL: SERVER_URL + '/storage/images/',
};
