import ApiService from '@/common/api.service';
import {
  UPLOAD_PITCH_DECK,
  FETCH_PITCH_DECKS,
  FETCH_PITCH_DECK_BY_ID,
  DOWNLOAD_PITCH_DECK,
  SUBMIT_PITCH_DECK_FOR_REVIEW,
} from '@/store/actions.type';
import {
  SET_ERROR,
  SET_PITCH_DECK,
  SET_PITCH_DECK_LIST,
  CLEAR_ERRORS,
} from '@/store/mutations.type';

// #todo remove dummy fetch function when backend is written for it.
import { wait } from '@/assets/utils';
async function fakeSubmitPitchDeckForReview (id) {
  return Promise.resolve({
    data: {
      pitchDeck: {
        id,
        status: 'UNDER_REVIEW',
        owner: {
          _id: '5ea739310c88831a96d43cca',
          email: 'founder@coalamails.com',
          username: 'founder',
          company: 'Founder LLC',
        },
        lockDate: '2020-04-28T19:58:35.091Z',
        isLocked: true,
        createdAt: '2020-04-27T19:58:41.030Z',
        updatedAt: new Date(),
        s3Key: 'Your big idea_2a9f4ac8-f85b-4613-bb4f-b0df81c2f6eb.pdf',
        filename: 'Your big idea.pdf',
        reviews: [],
      },
    },
  }).then(wait(3000));
}

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
  async [SUBMIT_PITCH_DECK_FOR_REVIEW] ({ commit, dispatch }, payload) {
    try {
      const { id } = payload;

      // #todo Replace this dummy api call with the actual api call
      const { data } = await fakeSubmitPitchDeckForReview(id);

      return data;
    } catch (error) {
      return {
        error: error.message || 'There was an error updating the status.',
      };
    }
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
