<script>
import { createNamespacedHelpers } from 'vuex';
import { REGISTER } from '@/store/actions.type';

const {
  mapActions,
  mapState,
} = createNamespacedHelpers('auth');

/**
 * TheRegister
 *
 * The Register view
 */
export default {
  name: 'TheRegister',
  data () {
    return {
      username: '',
      email: '',
      company: '',
      password: '',
    };
  },
  computed: {
    ...mapState([
      'errors',
    ]),
  },
  methods: {
    ...mapActions({
      registerUser: REGISTER,
    }),
    async onSubmit () {
      // #todo Need to clear the errors before dispatching
      await this.registerUser({
        username: this.username,
        email: this.email,
        company: this.company,
        password: this.password,
      });
      await this.$router.push({ name: 'home' });
    },
  },
};
</script>

<template>
  <div
    id="view"
    class="auth-page"
  >
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <ul
            v-if="errors"
            class="error-messages"
          >
            <li
              v-for="(v, k) in errors"
              :key="k"
            >
              {{ k }} {{ v }}
            </li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="company"
                class="form-control form-control-lg"
                type="text"
                placeholder="Company"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
