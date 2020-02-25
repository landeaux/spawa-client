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
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueYouTubeEmbed from 'vue-youtube-embed';
import { IconsPlugin } from 'bootstrap-vue';

Vue.use(IconsPlugin);

Vue.use(VueFriendlyIframe);
Vue.use(VueYouTubeEmbed, { global: true, componentId: 'YouTubePlayer' });

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.filter('error', ErrorFilter);

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
