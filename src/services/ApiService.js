// import Api from '@/services/Api';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
};

export default {
  login (params) {
    return axios.post('api/admin', params);
  },

  getHomepage () {
    return axios.get('api/');
  },

  setHeadline (params) {
    return axios.put('api/headline/' + params.id, params, {
      headers: headers
    });
  }
};
