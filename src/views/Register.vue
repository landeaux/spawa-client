<script>
import {
  createNamespacedHelpers,
} from 'vuex';
import {
  REGISTER,
} from '@/store/actions.type';
import {
  CLEAR_ERRORS,
} from '@/store/mutations.type';
import {
  ValidationObserver,
} from 'vee-validate';

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
    TextInputWithValidation: () => import('@/components/TextInputWithValidation'),
    ValidationObserver,
  },
  data () {
    return {
      state: INIT,
      showError: false,
      username: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
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

          <ValidationObserver
            ref="form"
            v-slot="{ handleSubmit, invalid }"
            tag="div"
          >
            <form @submit.prevent="handleSubmit(onSubmit)">
              <TextInputWithValidation
                id="username"
                v-model="username"
                label="Username"
                type="text"
                rules="alpha_num"
                required
              />
              <TextInputWithValidation
                id="email"
                v-model="email"
                label="Email"
                type="email"
                required
              />
              <TextInputWithValidation
                id="company"
                v-model="company"
                label="Company"
                type="text"
                required
              />
              <TextInputWithValidation
                id="password"
                v-model="password"
                label="Password"
                required
                type="password"
                vid="password"
              />
              <TextInputWithValidation
                id="confirm-password"
                v-model="confirmPassword"
                label="Confirm Password"
                required
                rules="password:@password"
                type="password"
                vid="confirm-password"
              />
              <b-button
                :disabled="invalid"
                type="submit"
                variant="primary"
              >
                Sign up
              </b-button>
            </form>
          </ValidationObserver>
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
