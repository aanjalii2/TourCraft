import axios from 'axios';

const ApiService = axios.create({
  baseURL: 'http://localhost:8000', // Adjust this URL according to your Django server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ApiService;
