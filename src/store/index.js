import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth.module';
import profile from './modules/profile.module';
import user from './modules/user.module';
import pitchDeck from './modules/pitchDeck.module';
import review from './modules/review.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    user,
    pitchDeck,
    review,
  },
});
