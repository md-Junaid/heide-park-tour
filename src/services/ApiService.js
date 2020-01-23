import axios from 'axios';
import router from '@/router/index';
import store from '../store';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
};

axios.interceptors.response.use(
  response => {
    // console.log(response)
    return response;
  },
  err => {
    // console.log(err)
    const { response: { status, data } } = err;
    if (status === 401 && data.message === "Expired Token") {
      store.dispatch('tokenExpire');
      router.push({ name: 'Login' });
    }
  }
);

export default {
  login (params) {
    return axios.post('api/admin', params);
  },

  getHomepage () {
    return axios.get('api/');
  },

  fetchAllPosts () {
    return axios.get('api/attractions');
  },

  addPost (params) {
    return axios.post('api/attractions', params, {
      headers: headers
    });
  }
};
