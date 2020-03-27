import ApiService from '@/common/api.service';
import {
  CREATE_USER,
} from '@/store/actions.type';
import {
  SET_ERROR,
} from '@/store/mutations.type';

const state = {
  errors: null,
};

const getters = {
  errors: (state) => state.errors,
};

const actions = {
  async [CREATE_USER] (context, user) {
    try {
      const { data } = await ApiService.post('user', { user });
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      context.commit(SET_ERROR, errors);
      return response.data;
    }
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
