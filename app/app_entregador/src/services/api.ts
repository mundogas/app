import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mundodogas.com.br/api',
  //baseURL: 'https://api-mundodogas.herokuapp.com/api',
  //baseURL: 'http://192.168.0.12:19004/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

export default api;