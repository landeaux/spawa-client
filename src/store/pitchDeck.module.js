import ApiService from '@/common/api.service';
import { wait } from '@/assets/utils';
import {
  CREATE_PITCH_DECK,
  FETCH_PITCH_DECKS,
  FETCH_PITCH_DECK_BY_ID,
  DOWNLOAD_PITCH_DECK,
} from '@/store/actions.type';
import {
  SET_ERROR,
  SET_PITCH_DECK,
  SET_PITCH_DECK_LIST,
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
  async [FETCH_PITCH_DECKS] ({ commit }) {
    // #todo update FETCH_PITCH_DECKS to make a real API call
    try {
      // const { data } = await ApiService.get('pitchdecks');

      // Fake data
      const data = {
        pitchDecks: [
          {
            id: '5e900a650560eb52cc0e5de5',
            s3Key: 'Your big idea_9f05d82d-b3d4-414b-bd97-d9ae32925d21.pdf',
            filename: 'Your big idea.pdf',
            rejectionCount: 0,
            accepted: false,
            owner: '5e90027a220bf0513ae546c9',
            reviews: ['1', '2', '3'],
            createdAt: '2020-04-10T05:55:49.384Z',
            updatedAt: '2020-04-10T05:55:49.384Z',
            company: 'Burger King',
          },
          {
            id: '5e900a650560eb52cc0e5de6',
            s3Key: 'Your big idea_9f05d82d-b3d4-414b-bd97-d9ae32925d21.pdf',
            filename: 'Your big idea.pdf',
            rejectionCount: 0,
            accepted: false,
            owner: '5e90027a220bf0513ae546c9',
            reviews: ['5e9556a4f3e82d13e3f5f2c4'],
            createdAt: '2020-03-28T05:55:49.384Z',
            updatedAt: '2020-03-28T05:55:49.384Z',
            company: 'McDonald\'s',
          },
          {
            id: '5e900a650560eb52cc0e5de7',
            s3Key: 'Your big idea_9f05d82d-b3d4-414b-bd97-d9ae32925d21.pdf',
            filename: 'Your big idea.pdf',
            rejectionCount: 0,
            accepted: false,
            owner: '5e90027a220bf0513ae546c9',
            reviews: [0],
            createdAt: '2020-04-09T05:55:49.384Z',
            updatedAt: '2020-04-09T05:55:49.384Z',
            company: 'Wendy\'s',
          },
        ],
      };
      await Promise.resolve().then(wait(1000)); // fake a network delay
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
  [SET_PITCH_DECK] (state, payload) {
    state.pitchDeck = payload;
  },
  [SET_PITCH_DECK_LIST] (state, payload) {
    state.pitchDeckList = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
