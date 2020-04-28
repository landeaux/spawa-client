import ApiService from '@/common/api.service';
import {
  CREATE_REVIEW,
  GET_REVIEW_BY_ID,
  GET_REVIEWS,
  GET_REVIEWS_BY_PITCH_DECK_ID,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from '@/store/actions.type';
import {
  SET_ERROR,
  CLEAR_ERRORS,
} from '@/store/mutations.type';

const state = {
  reviewErrors: [],
};

const getters = {
  reviewErrors: (state) => [...state.reviewErrors],
};

const actions = {
  async [CREATE_REVIEW] ({ commit, dispatch }, review) {
    commit(CLEAR_ERRORS);
    try {
      const { data } = await ApiService.post('reviews', { review });
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      commit(SET_ERROR, errors);
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
  async [GET_REVIEWS_BY_PITCH_DECK_ID] (context, id) {
    try {
      const { data } = await ApiService.get('reviews/pitchdeck', id);
      return data;
    } catch (error) {
      context.commit(SET_ERROR, error);
      if (process.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  },
  async [UPDATE_REVIEW] ({ commit, dispatch }, review) {
    commit(CLEAR_ERRORS);
    try {
      const { id } = review;
      const { data } = await ApiService.update('reviews', id, { review });

      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      commit(SET_ERROR, errors);
      return response.data;
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
  [CLEAR_ERRORS] (state) {
    state.reviewErrors = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
