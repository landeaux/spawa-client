import ApiService from '@/common/api.service';
import {
  FETCH_PITCH_DECKS,
  FETCH_PITCH_DECK_BY_ID,
} from '@/store/actions.type';
import {
  SET_ERROR,
} from '@/store/mutations.type';

const state = {
  pitchDeckErrors: [],
};

const getters = {

};

const actions = {
  async [FETCH_PITCH_DECKS] (context) {
    try {
      const { data } = await ApiService.get('pitchdecks');
      return data;
    } catch (error) {
      context.commit(SET_ERROR, error);
      return error;
    }
  },
  async [FETCH_PITCH_DECK_BY_ID] (context, id) {
    try {
      const { data } = await ApiService.get('pitchdecks', id);
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
    state.pitchDeckErrors.push(error);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
