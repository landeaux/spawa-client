import ApiService from '@/common/api.service';
import {
  CREATE_USER,
  FETCH_USERS,
  SUSPEND_USER,
  ACTIVATE_USER,
  DELETE_USER,
} from '@/store/actions.type';
import {
  SET_ERROR,
} from '@/store/mutations.type';

const state = {
  userErrors: [],
};

const getters = {
  userErrors: (state) => [...state.userErrors],
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
      const response = await ApiService.get('users');
      return response.data;
    } catch (error) {
      context.commit(SET_ERROR, error);
      return error;
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
  async [ACTIVATE_USER] (context, id) {
    try {
      const { data } = await ApiService.update('user/activate', id);
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      context.commit(SET_ERROR, errors);
      return response.data;
    }
  },
  async [DELETE_USER] (context, id) {
    try {
      return await ApiService.delete('user', id);
    } catch (error) {
      context.commit(SET_ERROR, error);
      return error;
    }
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.userErrors.push(error);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
