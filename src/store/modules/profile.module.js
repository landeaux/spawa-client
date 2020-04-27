import ApiService from '@/common/api.service';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_BY_USERNAME,
} from '@/store/actions.type';
import {
  SET_PROFILE,
  SET_ERROR,
} from '@/store/mutations.type';

const state = {
  profileErrors: [],
  profile: {},
};

const getters = {
  profile: (state) => state.profile,
  profileErrors: (state) => [...state.profileErrors],
};

const actions = {
  async [FETCH_PROFILE] (context) {
    try {
      const { data } = await ApiService.get('profile');
      context.commit(SET_PROFILE, data.profile);
      return data;
    } catch (error) {
      context.commit(SET_ERROR, error);
      if (process.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  },
  async [FETCH_PROFILE_BY_USERNAME] (context, payload) {
    try {
      const { username } = payload;
      const { data } = await ApiService.get('profile', username);
      context.commit(SET_PROFILE, data.profile);
      return data;
    } catch (error) {
      context.commit(SET_ERROR, error);
      if (process.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.profileErrors.push(error);
  },
  [SET_PROFILE] (state, profile) {
    state.profile = profile;
    state.errors = [];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
