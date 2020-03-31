<script>
import { mapState } from 'vuex';
import { CREATE_USER } from '@/store/actions.type';

export default {
  name: 'AdminDashboardCreateUser',
  data () {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        active: true,
        role: '',
        state: '',
      },
      roles: [
        { text: 'Select One', value: null },
        { text: 'Founder', value: 'founder' },
        { text: 'Admin', value: 'admin' },
        { text: 'Reviewer', value: 'reviewer' },
      ],
      states: [
        { text: 'Select One', value: null },
        { text: 'Submit Eapp', value: 'submit_eapp' },
        { text: 'Watch Pitch Video', value: 'watch_pitch_video' },
        { text: 'Take Pitch Quiz', value: 'take_pitch_quiz' },
        { text: 'Submit Pitch Deck', value: 'submit_pitch_deck' },
        { text: 'Pitch Deck Review', value: 'pitch_deck_review' },
        { text: 'Book Pitch Date', value: 'book_pitch_date' },
        { text: 'Pitch Accepted', value: 'pitch_accepted' },
        { text: 'Pitch Cancelled', value: 'pitch_cancelled' },
      ],
      show: true,
      createdUsername: '',
      showErrorAlert: false,
      showSuccessAlert: false,
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors,
    }),
  },
  methods: {
    async onSubmit (evt) {
      Object.keys(this.errors).forEach(k => delete this.errors[k]);
      if (this.form.role !== 'founder') { this.form.state = ''; }
      evt.preventDefault();
      await this.$store.dispatch(CREATE_USER, {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        active: this.form.active,
        role: this.form.role,
        state: this.form.state,
      });
      this.createdUsername = this.form.username;
      this.determineAlert();
      this.onReset(evt);
    },
    onReset (evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.username = '';
      this.form.password = '';
      this.form.active = true;
      this.form.role = '';
      this.form.state = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    determineAlert () {
      this.showErrorAlert = false;
      this.showSuccessAlert = false;
      if (Object.keys(this.errors).length !== 0) {
        this.showErrorAlert = true;
      } else if (Object.keys(this.errors).length === 0 && this.createdUsername !== '') {
        this.showSuccessAlert = true;
      }
    },
  },
};
</script>

<template>
  <div id="view">
    <b-alert
      v-model="showErrorAlert"
      variant="danger"
      dismissible
      class="alerts"
    >
      An error has occurred!
      <ul
        class="error-messages"
      >
        <li
          v-for="(v, k) in errors"
          :key="k"
        >
          {{ k }} {{ v }}
        </li>
      </ul>
    </b-alert>
    <b-alert
      v-model="showSuccessAlert"
      variant="success"
      dismissible
      class="alerts"
    >
      User Created:
      <router-link
        class="nav-link"
        active-class="active"
        :to="{
          name: 'profile',
          params: { username: createdUsername }
        }"
      >
        {{ createdUsername }}
      </router-link>
    </b-alert>
    <b-form
      v-if="show"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="main-form">
        <b-form-group
          id="input-group-email"
          label="Email:"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter Email"
          />
        </b-form-group>

        <b-form-group
          id="input-group-username"
          label="Username:"
          label-for="input-username"
        >
          <b-form-input
            id="input-username"
            v-model="form.username"
            required
            placeholder="Enter Username"
          />
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label="Password:"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter Password"
          />
        </b-form-group>

        <b-form-group>
          <b-form-checkbox
            id="input-active"
            v-model="form.active"
          >
            Active Account?
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          id="input-group-role"
          label="Role:"
          label-for="input-role"
        >
          <b-form-select
            id="input-role"
            v-model="form.role"
            :options="roles"
            required
          />
        </b-form-group>

        <b-form-group
          v-if="form.role === 'founder'"
          id="input-group-state"
          label="State:"
          label-for="input-state"
        >
          <b-form-select
            id="input-state"
            v-model="form.state"
            :options="states"
            required
          />
        </b-form-group>
      </div>
      <b-button
        type="submit"
        variant="primary"
        class="form-btn"
      >
        Submit
      </b-button>
      <b-button
        type="reset"
        variant="danger"
        class="form-btn"
      >
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<style scoped lang = sass>
  .main-form
    width: 45vw
    text-align: left
    color: #039
  .form-btn
    display: inline-flex
    flex-direction: row
    justify-content: space-evenly
    width: 10vw
    height: 2.5rem
    font-size: 16px
    margin: 10px
    font-weight: bold
  .alerts
    width: 45vw
</style>
