import ApiService from '@/common/api.service';
import {
  FETCH_PITCH_DECKS,
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
