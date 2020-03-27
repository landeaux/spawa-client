import ApiService from '@/common/api.service';
import {
  CREATE_USER,
  FETCH_USERS,
  SUSPEND_USER,
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
  async [FETCH_USERS] (context) {
    try {
      const { data } = await ApiService.get('users');
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      context.commit(SET_ERROR, errors);
      return response.data;
    }
  },
  async [SUSPEND_USER] (context, id) {
    try {
      const { data } = await ApiService.update('user/suspend', id);
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
