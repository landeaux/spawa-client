<script>
import { mapGetters } from 'vuex';
import {
  LOGOUT,
  UPDATE_USER,
} from '@/store/actions.type';

export default {
  name: 'TheSettings',
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  methods: {
    async updateSettings () {
      await this.$store.dispatch(UPDATE_USER, this.currentUser);
      // #todo, nice toast and no redirect
      await this.$router.push({ name: 'home' });
    },
    async logout () {
      await this.$store.dispatch(LOGOUT);
      await this.$router.push({ name: 'home' });
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
          <form @submit.prevent="updateSettings()">
            <fieldset>
              <fieldset class="form-group">
                <label for="username">Username</label>
                <input
                  id="username"
                  v-model="currentUser.username"
                  class="form-control form-control-lg"
                  type="text"
                  required
                >
              </fieldset>
              <fieldset class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="currentUser.email"
                  class="form-control form-control-lg"
                  type="email"
                  required
                >
              </fieldset>
              <fieldset class="form-group">
                <label for="company">Company</label>
                <input
                  id="company"
                  v-model="currentUser.company"
                  class="form-control form-control-lg"
                  type="text"
                  required
                >
              </fieldset>
              <fieldset class="form-group">
                <label for="new-password">New Password</label>
                <input
                  id="new-password"
                  v-model="currentUser.password"
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
