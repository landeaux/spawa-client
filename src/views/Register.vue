<script>
import { createNamespacedHelpers } from 'vuex';
import { REGISTER } from '@/store/actions.type';
import { CLEAR_ERRORS } from '@/store/mutations.type';

const {
  mapActions,
  mapMutations,
  mapState,
} = createNamespacedHelpers('auth');

/**
 * Component states
 */
const INIT = 'INIT';
const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

/**
 * TheRegister
 *
 * The Register view
 */
export default {
  name: 'TheRegister',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader'),
  },
  data () {
    return {
      state: INIT,
      showError: false,
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
    stateIsInit () {
      return this.state === INIT;
    },
    stateIsPending () {
      return this.state === PENDING;
    },
    stateIsSuccess () {
      return this.state === SUCCESS;
    },
    stateIsError () {
      return this.state === ERROR;
    },
  },
  created () {
    this.clearErrors();
  },
  methods: {
    ...mapActions({
      registerUser: REGISTER,
    }),
    ...mapMutations({
      clearErrors: CLEAR_ERRORS,
    }),
    async onSubmit () {
      this.clearErrors();
      this.state = PENDING;
      const response = await this.registerUser({
        username: this.username,
        email: this.email,
        company: this.company,
        password: this.password,
      });
      if (response) {
        this.state = SUCCESS;
        await this.$router.push({ name: 'home' });
      } else {
        this.state = ERROR;
        this.showError = true;
      }
    },
  },
};
</script>

<template>
  <div
    id="view"
    class="auth-page"
  >
    <PulseLoader
      v-if="stateIsPending"
      class="loader"
      color="blue"
      size="25px"
    />
    <div
      v-else
      class="container page"
    >
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
          <b-alert
            v-if="stateIsError"
            :show="true"
            fade
            variant="danger"
          >
            <ul
              v-if="errors"
              class="error-messages"
            >
              <li
                v-for="(v, k) in errors"
                :key="k"
              >
                <strong>{{ k | startCase }}</strong> {{ v }}
              </li>
            </ul>
            <span v-else>
              There was an error registering your account.
            </span>
          </b-alert>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                v-model="username"
                class="form-control form-control-lg"
                type="text"
              >
            </fieldset>
            <fieldset class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="email"
                class="form-control form-control-lg"
                type="text"
              >
            </fieldset>
            <fieldset class="form-group">
              <label for="company">Company</label>
              <input
                id="company"
                v-model="company"
                class="form-control form-control-lg"
                type="text"
              >
            </fieldset>
            <fieldset class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                class="form-control form-control-lg"
                type="password"
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

<style scoped lang="sass">
  fieldset
    &.form-group
      text-align: left
      label
        font-weight: bold
  ul
    margin: 0
    padding: 0
    li
      list-style: none
</style>
