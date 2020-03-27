import ApiService from '@/common/api.service';
import {
  CREATE_USER,
} from '@/store/actions.type';
import {
  SET_ERROR,
} from '@/store/mutations.type';

const state = {

};

const getters = {

};

const actions = {
  async [CREATE_USER] (context, user) {
    try {
      const { data } = await ApiService.post('user', { user });
      return data;
    } catch ({ response }) {
      context.commit(SET_ERROR, response.data.errors);
    }
  },
};

const mutations = {

};

export default {
  state,
  actions,
  mutations,
  getters,
};
