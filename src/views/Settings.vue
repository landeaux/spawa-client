<script>
import { createNamespacedHelpers } from 'vuex';
import {
  UPDATE_USER,
} from '@/store/actions.type';

const {
  mapActions,
  mapGetters,
} = createNamespacedHelpers('auth');

/**
 * component states
 */
const INIT = 'INIT';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

/**
 * other constants
 */
const TOAST_TIMEOUT = 10000; // timeout in ms

/**
 * TheSettings
 *
 * The Settings view.
 */
export default {
  name: 'TheSettings',
  data: () => ({
    state: INIT,
    showToast: false,
    form: {
      username: '',
      email: '',
      company: '',
      password: '',
    },
  }),
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
    stateIsInit () {
      return this.state === INIT;
    },
    stateIsSuccess () {
      return this.state === SUCCESS;
    },
    toastMessage () {
      if (this.stateIsInit) return '';
      return this.stateIsSuccess
        ? 'Profile Updated!'
        : 'There was an error updating your profile.';
    },
    toastVariant () {
      return this.stateIsSuccess
        ? 'success'
        : 'danger';
    },
  },
  created () {
    this.form.username = this.currentUser.username;
    this.form.email = this.currentUser.email;
    this.form.company = this.currentUser.company;
    this.form.password = this.currentUser.password;
  },
  methods: {
    ...mapActions({
      updateUser: UPDATE_USER,
    }),
    async onSubmit () {
      try {
        await this.updateUser(this.form);
        this.state = SUCCESS;
      } catch (error) {
        this.state = ERROR;
      }
      this.showToast = true;
      setTimeout(() => { this.showToast = false; }, TOAST_TIMEOUT);
    },
  },
};
</script>

<template>
  <div
    id="view"
    class="settings-page"
  >
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Your Settings
          </h1>
          <b-alert
            v-model="showToast"
            class="mb-3 rounded-1"
            :variant="toastVariant"
            dismissible
            fade
          >
            {{ toastMessage }}
          </b-alert>
          <form @submit.prevent="onSubmit()">
            <fieldset>
              <fieldset class="form-group">
                <label for="username">Username</label>
                <input
                  id="username"
                  v-model="form.username"
                  class="form-control form-control-lg"
                  type="text"
                  required
                >
              </fieldset>
              <fieldset class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  class="form-control form-control-lg"
                  type="email"
                  required
                >
              </fieldset>
              <fieldset class="form-group">
                <label for="company">Company</label>
                <input
                  id="company"
                  v-model="form.company"
                  class="form-control form-control-lg"
                  type="text"
                  required
                >
              </fieldset>
              <fieldset class="form-group">
                <label for="new-password">New Password</label>
                <input
                  id="new-password"
                  v-model="form.password"
                  class="form-control form-control-lg"
                  type="password"
                >
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  fieldset
    &.form-group
      text-align: left
      label
        font-weight: bold
</style>
