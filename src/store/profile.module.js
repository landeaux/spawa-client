import ApiService from '@/common/api.service';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_BY_USERNAME,
} from './actions.type';
import { SET_PROFILE } from './mutations.type';

const state = {
  errors: {},
  profile: {},
};

const getters = {
  profile (state) {
    return state.profile;
  },
};

const actions = {
  async [FETCH_PROFILE] (context) {
    try {
      const { data } = await ApiService.get('profile');
      context.commit(SET_PROFILE, data.profile);
      return data;
    } catch (err) {
      // #todo SET_ERROR cannot work in multiple states
      // context.commit(SET_ERROR, response.data.errors)
      if (process.NODE_ENV !== 'production') {
        console.error(err);
      }
    }
  },
  [FETCH_PROFILE_BY_USERNAME] (context, payload) {
    const { username } = payload;
    return ApiService.get('profile', username)
      .then(({ data }) => {
        context.commit(SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  },
};

const mutations = {
  // [SET_ERROR] (state, error) {
  //   state.errors = error
  // },
  [SET_PROFILE] (state, profile) {
    state.profile = profile;
    state.errors = {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
