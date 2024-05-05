import axios from 'axios'

const BASE_URL = "http://localhost:7000/api"; 

const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
   
  (error) => {
    if (error.response) {
      const { data } = error.response;
      console.log('axios error:', data.message);
    } else {
      console.log('axios error:', error);
    }

    return Promise.reject(error);
  }
);

export default Api