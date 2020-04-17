import ApiService from '@/common/api.service';
import {
  CREATE_REVIEW,
  GET_REVIEW_BY_ID,
  GET_REVIEWS,
  DELETE_REVIEW,
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
  async [GET_REVIEW_BY_ID] (context, id) {
    try {
      const { data } = await ApiService.get('reviews', id);
      return data;
    } catch (error) {
      context.commit(SET_ERROR, error);
      if (process.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  },
  async [GET_REVIEWS] (context) {
    try {
      const { data } = await ApiService.get('reviews');
      return data;
    } catch (error) {
      context.commit(SET_ERROR, error);
      if (process.NODE_ENV !== 'production') {
        console.error(error);
      }
      return error;
    }
  },
  async [DELETE_REVIEW] (context, id) {
    try {
      return await ApiService.delete('reviews', id);
    } catch (error) {
      context.commit(SET_ERROR, error);
      if (process.NODE_ENV !== 'production') {
        console.error(error);
      }
      return error;
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
