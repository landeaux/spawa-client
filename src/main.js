import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { CHECK_AUTH } from './store/actions.type';
import ApiService from './common/api.service';
import DateFilter from './common/date.filter';
import ErrorFilter from './common/error.filter';
import StartCaseFilter from './common/startCase.filter';
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueYouTubeEmbed from 'vue-youtube-embed';
import { IconsPlugin } from 'bootstrap-vue';
import '@/assets/VeeValidate/rules';

Vue.use(IconsPlugin);

Vue.use(VueFriendlyIframe);
Vue.use(VueYouTubeEmbed, { global: true, componentId: 'YouTubePlayer' });

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.filter('error', ErrorFilter);
Vue.filter('startCase', StartCaseFilter);

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach(async (to, from, next) => {
  await Promise.all([store.dispatch(`auth/${CHECK_AUTH}`)]);
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  if (isAuthenticated || to.name === 'login' || to.name === 'register') {
    next();
  } else {
    next({ name: 'login' });
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
