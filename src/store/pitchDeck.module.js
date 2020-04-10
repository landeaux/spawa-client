import ApiService from '@/common/api.service';
import {
  CREATE_PITCH_DECK,
  FETCH_PITCH_DECKS,
  FETCH_PITCH_DECK_BY_ID,
  DOWNLOAD_PITCH_DECK,
} from '@/store/actions.type';
import {
  SET_ERROR,
  SET_PITCH_DECK,
} from '@/store/mutations.type';

const state = {
  pitchDeckErrors: [],
  pitchDeck: null,
};

const getters = {
  pitchDeck: (state) => ({ ...state.pitchDeck }),
};

const actions = {
  async [CREATE_PITCH_DECK] (context, payload) {
    try {
      const { data } = await ApiService.post('pitchdecks', payload);
      context.commit(SET_PITCH_DECK, data);
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      context.commit(SET_ERROR, errors);
      return response.data;
    }
  },
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
  [DOWNLOAD_PITCH_DECK] (context, payload) {
    const { id } = payload;

    ApiService.get('pitchDecks', `${id}/download`, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: `application/pptx` });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'PitchDeck';
        link.click();
        URL.revokeObjectURL(link.href);
      }).catch(console.error);
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.pitchDeckErrors.push(error);
  },
  [SET_PITCH_DECK] (state, payload) {
    state.pitchDeck = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
