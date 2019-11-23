<script>
import { mapState } from 'vuex'
import { LOGIN } from '@/store/actions.type'

export default {
  name: 'RwvLogin',
  data () {
    return {
      email: null,
      password: null
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    async onSubmit (email, password) {
      try {
        await this.$store.dispatch(LOGIN, {
          email,
          password
        })
        this.$router.push({ name: 'home' })
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(err)
        }
      }
    }
  }
}
</script>

<template>
  <div class="auth-page">
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
          <form @submit.prevent="onSubmit(email, password)">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                placeholder="Email"
                type="text"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                placeholder="Password"
                type="password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
