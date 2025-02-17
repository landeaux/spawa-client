import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';

const ApiService = {
  init () {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`;
  },

  query (resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get (resource, slug = '', config = {}) {
    return Vue.axios.get(`${resource}/${slug}`, config).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update (resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put (resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete (resource, slug = '') {
    return Vue.axios.delete(`${resource}/${slug}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;
