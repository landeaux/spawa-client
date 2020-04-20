import ApiService from '@/common/api.service';
import {
  CREATE_USER,
  FETCH_USERS,
  SUSPEND_USER,
  ACTIVATE_USER,
  UPDATE_USER_BY_ID,
  DELETE_USER,
} from '@/store/actions.type';
import {
  SET_ERROR,
  SET_USER_LIST,
} from '@/store/mutations.type';

const state = {
  userErrors: [],
  userList: [],
};

const getters = {
  userErrors: (state) => [...state.userErrors],
  userList: (state) => [...state.userList],
};

const actions = {
  async [CREATE_USER] ({ commit, dispatch }, user) {
    try {
      const { data } = await ApiService.post('user', { user });
      dispatch(FETCH_USERS);
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      commit(SET_ERROR, errors);
      return response.data;
    }
  },
  async [FETCH_USERS] (context) {
    try {
      const response = await ApiService.get('users');
      context.commit(SET_USER_LIST, response.data.users);
      return response.data.users;
    } catch (error) {
      context.commit(SET_ERROR, error);
      return error;
    }
  },
  async [SUSPEND_USER] ({ commit, dispatch }, id) {
    try {
      const { data } = await ApiService.update('user/suspend', id);
      dispatch(FETCH_USERS);
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      commit(SET_ERROR, errors);
      return response.data;
    }
  },
  async [ACTIVATE_USER] ({ commit, dispatch }, id) {
    try {
      const { data } = await ApiService.update('user/activate', id);
      dispatch(FETCH_USERS);
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      commit(SET_ERROR, errors);
      return response.data;
    }
  },
  async [UPDATE_USER_BY_ID] ({ dispatch }, payload) {
    const { id } = payload;
    delete payload.id;
    const { data } = await ApiService.update('user', id, {
      user: payload,
    });
    await dispatch(FETCH_USERS);
    return data;
  },
  async [DELETE_USER] ({ commit, dispatch }, id) {
    try {
      await ApiService.delete('user', id);
      dispatch(FETCH_USERS);
    } catch (error) {
      commit(SET_ERROR, error);
      return error;
    }
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.userErrors.push(error);
  },
  [SET_USER_LIST] (state, payload) {
    state.userList = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
