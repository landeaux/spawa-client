import ApiService from '@/common/api.service';
import JwtService from '@/common/jwt.service';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER,
  UPDATE_USER_STATE,
} from '@/store/actions.type';
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  CLEAR_ERRORS,
} from '@/store/mutations.type';

const state = {
  errors: {},
  user: {},
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser (state) {
    return state.user;
  },
  isAuthenticated (state) {
    return state.isAuthenticated;
  },
};

const actions = {
  async [LOGIN] (context, credentials) {
    try {
      const { data } = await ApiService.post('login', { user: credentials });
      context.commit(SET_AUTH, data.user);
      return data;
    } catch ({ response }) {
      context.commit(SET_ERROR, response.data.errors);
    }
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH);
  },
  async [REGISTER] (context, credentials) {
    try {
      const { data } = await ApiService.post('signup', { user: credentials });
      context.commit(SET_AUTH, data.user);
      return data;
    } catch ({ response }) {
      context.commit(SET_ERROR, response.data.errors);
    }
  },
  [CHECK_AUTH] (context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get('user')
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER] (context, payload) {
    return ApiService.put('user', { user: payload }).then(({ data }) => {
      context.commit(SET_AUTH, data.user);
      return data;
    });
  },
  [UPDATE_USER_STATE] (context, payload) {
    return ApiService.put('user/state', { user: payload }).then(({ data }) => {
      context.commit(SET_AUTH, data.user);
      return data;
    });
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error;
  },
  [CLEAR_ERRORS] (state) {
    state.errors = {};
  },
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
