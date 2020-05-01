<script>
import { CREATE_USER } from '@/store/actions.type';
import { createNamespacedHelpers } from 'vuex';
import {
  ValidationObserver,
} from 'vee-validate';

const {
  mapActions,
  mapGetters,
} = createNamespacedHelpers('user');

export default {
  name: 'AdminDashboardCreateUser',
  components: {
    ValidationObserver,
    TextInputWithValidation: () => import('@/components/TextInputWithValidation'),
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: '',
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
    ...mapGetters([
      'userErrors',
    ]),
    errors () {
      return this.userErrors[0];
    },
  },
  methods: {
    ...mapActions({
      createUser: CREATE_USER,
    }),
    async onSubmit () {
      Object.keys(this.userErrors).forEach(k => delete this.userErrors[k]);
      if (this.form.role !== 'founder') { this.form.state = ''; }
      await this.createUser({
        username: this.form.username,
        email: this.form.email,
        company: this.form.company,
        password: this.form.password,
        active: this.form.active,
        role: this.form.role,
        state: this.form.state,
      });
      this.createdUsername = this.form.username;
      this.determineAlert();
      this.onReset(this.$refs.form.reset);
    },
    onReset (reset) {
      // Reset our form values
      this.form.username = '';
      this.form.email = '';
      this.form.company = '';
      this.form.password = '';
      this.form.confirmPassword = '';
      this.form.active = true;
      this.form.role = '';
      this.form.state = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });

      // reset form validation state
      reset();
    },
    determineAlert () {
      this.showErrorAlert = false;
      this.showSuccessAlert = false;
      if (Object.keys(this.userErrors).length !== 0) {
        this.showErrorAlert = true;
      } else if (Object.keys(this.userErrors).length === 0 && this.createdUsername !== '') {
        this.showSuccessAlert = true;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <b-alert
      v-model="showErrorAlert"
      variant="danger"
      class="alerts"
      fade
      dismissible
      dismiss-label="Close"
    >
      <div class="error-messages">
        <p>An error has occurred!</p>
        <ul>
          <li
            v-for="(v, k) in errors"
            :key="k"
          >
            <strong>{{ k }}</strong> {{ v }}
          </li>
        </ul>
      </div>
    </b-alert>
    <b-alert
      v-model="showSuccessAlert"
      variant="success"
      class="alerts"
      dismissible
      fade
    >
      <div class="success-messages">
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
      </div>
    </b-alert>

    <ValidationObserver
      ref="form"
      v-slot="{ handleSubmit, reset, invalid, pristine }"
      tag="div"
    >
      <b-form
        v-if="show"
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="onReset(reset)"
      >
        <div class="main-form">
          <TextInputWithValidation
            id="username"
            v-model="form.username"
            label="Username"
            placeholder="Enter Username"
            rules="alpha_num"
            required
            type="text"
          />
          <TextInputWithValidation
            id="email"
            v-model="form.email"
            label="Email"
            placeholder="Enter Email"
            required
            type="email"
          />
          <TextInputWithValidation
            id="company"
            v-model="form.company"
            label="Company"
            placeholder="Enter Company"
            required
            type="text"
          />
          <TextInputWithValidation
            id="password"
            v-model="form.password"
            label="Password"
            placeholder="Enter Password"
            required
            rules="password:@confirm-password"
            type="password"
            vid="password"
          />
          <TextInputWithValidation
            id="confirm-password"
            v-model="form.confirmPassword"
            label="Confirm Password"
            placeholder="Re-type Password"
            required
            rules="password:@password"
            type="password"
            vid="confirm-password"
          />

          <b-form-group>
            <b-form-checkbox
              id="input-active"
              v-model="form.active"
              size="lg"
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
              size="lg"
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
              size="lg"
            />
          </b-form-group>
        </div>
        <b-button
          type="submit"
          :disabled="invalid"
          variant="primary"
          class="form-btn"
        >
          Submit
        </b-button>
        <b-button
          type="reset"
          :disabled="pristine"
          variant="danger"
          class="form-btn"
        >
          Reset
        </b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<style scoped lang = sass>
  .main-form
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
    &[disabled]
      cursor: not-allowed
  .alerts
    .error-messages, .success-messages
      padding-left: 2.5rem
    .error-messages
      ul
        margin: 0
        padding: 0
        li
          list-style: none
</style>
