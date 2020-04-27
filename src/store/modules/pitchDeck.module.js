import ApiService from '@/common/api.service';
import {
  UPLOAD_PITCH_DECK,
  FETCH_PITCH_DECKS,
  FETCH_PITCH_DECK_BY_ID,
  DOWNLOAD_PITCH_DECK,
} from '@/store/actions.type';
import {
  SET_ERROR,
  SET_PITCH_DECK,
  SET_PITCH_DECK_LIST,
  CLEAR_ERRORS,
} from '@/store/mutations.type';

const state = {
  pitchDeckErrors: [],
  pitchDeck: null,
  pitchDeckList: [],
};

const getters = {
  pitchDeck: (state) => ({ ...state.pitchDeck }),
  pitchDeckErrors: (state) => [ ...state.pitchDeckErrors ],
  pitchDeckList: (state) => [ ...state.pitchDeckList ],
};

const actions = {
  async [UPLOAD_PITCH_DECK] (context, payload) {
    try {
      const { data } = await ApiService.put('pitchdecks', payload);
      context.commit(SET_PITCH_DECK, data);
      return data;
    } catch ({ response }) {
      const { errors } = response.data;
      context.commit(SET_ERROR, errors);
      return response.data;
    }
  },
  async [FETCH_PITCH_DECKS] ({ commit }) {
    try {
      const { data } = await ApiService.get('pitchdecks/active');
      commit(SET_PITCH_DECK_LIST, data.pitchDecks);
      return data.pitchDecks;
    } catch (error) {
      commit(SET_ERROR, error);
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
        const { data } = response;
        const ext = {
          'application/pdf': 'pdf',
          'vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        }[data.type];
        const blob = new Blob([data], { type: data.type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `PitchDeck.${ext}`;
        link.click();
        URL.revokeObjectURL(link.href);
      }).catch(console.error);
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.pitchDeckErrors.push(error);
  },
  [CLEAR_ERRORS] (state) {
    state.pitchDeckErrors = [];
  },
  [SET_PITCH_DECK] (state, payload) {
    state.pitchDeck = payload;
  },
  [SET_PITCH_DECK_LIST] (state, payload) {
    state.pitchDeckList = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
