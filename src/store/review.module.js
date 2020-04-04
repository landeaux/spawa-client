import ApiService from '@/common/api.service';
import {
  CREATE_REVIEW,
} from '@/store/actions.type';
import {
  SET_ERROR,
} from '@/store/mutations.type';

const state = {
  reviewErrors: [],
};

const getters = {
  reviewErrors: (state) => [...state.reviewErrors],
};

const actions = {
  async [CREATE_REVIEW] (context, review) {
    try {
      const { data } = await ApiService.post('reviews', { review });
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
    state.reviewErrors.push(error);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
