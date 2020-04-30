<script>
import {
  createNamespacedHelpers,
} from 'vuex';
import {
  LOGIN,
} from '@/store/actions.type';
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';

const {
  mapActions,
  mapState,
} = createNamespacedHelpers('auth');

export default {
  name: 'Login',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data () {
    return {
      username: null,
      password: null,
    };
  },
  computed: {
    ...mapState([
      'errors',
    ]),
  },
  methods: {
    ...mapActions({
      login: LOGIN,
    }),
    async onSubmit (username, password) {
      await this.login({
        username,
        password,
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
            Sign in
          </h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
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
              {{ k }} {{ v | error }}
            </li>
          </ul>

          <ValidationObserver
            ref="form"
            v-slot="{ handleSubmit, invalid }"
            tag="div"
          >
            <form @submit.prevent="onSubmit(username, password)">
              <fieldset class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Username"
                >
                  <label for="username">Username</label>
                  <input
                    id="username"
                    v-model="username"
                    class="form-control form-control-lg"
                    type="text"
                    required
                  >
                  <span class="form-field-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </fieldset>
              <fieldset class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                >
                  <label for="password">Password</label>
                  <input
                    id="password"
                    v-model="password"
                    class="form-control form-control-lg"
                    type="password"
                    required
                  >
                  <span class="form-field-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
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
      .form-field-error
        color: red
        font-size: 1rem
</style>
