import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth.module';
import profile from './modules/profile.module';
import user from './modules/user.module';
import pitchDeck from './modules/pitchDeck.module';
import review from './modules/review.module';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    user,
    pitchDeck,
    review,
  },
  /**
   * In strict mode, whenever Vuex state is mutated outside of mutation
   * handlers, an error will be thrown. This ensures that all state mutations
   * can be explicitly tracked by debugging tools.
   */
  strict: debug,
});
