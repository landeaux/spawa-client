import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/Register'),
  },
  // Handle child routes with a default, by giving the name to the child.
  // SO: https://github.com/vuejs/vue-router/issues/777
  {
    name: 'profile',
    path: '/@:username',
    component: () => import('../views/Profile'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('../views/Settings'),
  },
  {
    name: 'submit-eapp',
    path: '/submit-eapp',
    component: () => import('../views/SubmitEapp'),
  },
  {
    name: 'watch-pitch-video',
    path: '/watch-pitch-video',
    component: () => import('../views/WatchPitchVideo'),
  },
  {
    name: 'take-pitch-quiz',
    path: '/take-pitch-quiz',
    component: () => import('../views/TakePitchQuiz'),
  },
  {
    name: 'submit-pitch-deck',
    path: '/submit-pitch-deck',
    component: () => import('../views/SubmitPitchDeck'),
  },
  {
    name: 'book-pitch-date',
    path: '/book-pitch-date',
    component: () => import('../views/BookPitchDate'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
