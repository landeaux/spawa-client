<script>
import { UPDATE_USER_BY_ID } from '@/store/actions.type';
import { createNamespacedHelpers } from 'vuex';

const {
  mapActions,
  mapGetters,
  mapMutations,
} = createNamespacedHelpers('user');

/**
 * component statuses
 */
const INIT = 'INIT';
const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

/**
 * AdminDashboardModifyUser
 *
 * The Modify User form in the Admin Dashboard.
 */
export default {
  name: 'AdminDashboardModifyUser',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  props: {
    user: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      status: INIT,
      errors: {},
      form: {
        // Note: these prop names must exactly match user prop names
        username: '',
        email: '',
        company: '',
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
      founderStates: [
        { text: 'Submit Eapp', value: 'submit_eapp' },
        { text: 'Watch Pitch Video', value: 'watch_pitch_video' },
        { text: 'Take Pitch Quiz', value: 'take_pitch_quiz' },
        { text: 'Submit Pitch Deck', value: 'submit_pitch_deck' },
        { text: 'Pitch Deck Review', value: 'pitch_deck_review' },
        { text: 'Book Pitch Date', value: 'book_pitch_date' },
        { text: 'Pitch Accepted', value: 'pitch_accepted' },
        { text: 'Pitch Cancelled', value: 'pitch_cancelled' },
      ],
      createdUsername: '',
    };
  },
  computed: {
    ...mapGetters([
      'userErrors',
    ]),
    determineCanSubmit () {
      return (this.form.username !== this.user.username ||
        this.form.email !== this.user.email ||
        this.form.company !== this.user.company ||
        this.form.password !== '' ||
        this.form.active !== this.user.active ||
        this.form.role !== this.user.role ||
        this.form.state !== this.user.state);
    },
    showForm () {
      return !this.statusIsPending;
    },
    statusIsPending () {
      return this.status === PENDING;
    },
    statusIsSuccess () {
      return this.status === SUCCESS;
    },
    statusIsError () {
      return this.status === ERROR;
    },
  },
  created () {
    this.setInitialFormValues();
    this.showLoader = false;
  },
  methods: {
    ...mapActions({
      updateUserById: UPDATE_USER_BY_ID,
    }),
    setInitialFormValues () {
      // Only copy the user props for which we have form fields
      Object.keys(this.form).forEach((key) => {
        this.form[key] = Object.prototype.hasOwnProperty.call(this.user, key)
          ? this.user[key]
          : '';
      });
    },
    async onSubmit () {
      this.errors = {};
      if (this.form.role !== 'founder') { this.form.state = ''; }
      const payload = { ...this.form };
      // Remove props which didn't change or are empty
      Object.keys(this.form).forEach((key) => {
        if (this.form[key] === this.user[key] || this.form[key] === '') {
          delete payload[key];
        }
      });
      payload.id = this.user.id;
      this.status = PENDING;
      try {
        await this.updateUserById(payload);
        this.createdUsername = this.form.username;
        this.status = SUCCESS;
      } catch ({ response }) {
        this.errors = response.data.errors;
        this.status = ERROR;
      }
    },
    onReset () {
      // Reset our form values
      this.status = INIT;
      this.errors = {};
      this.setInitialFormValues();
    },
    onErrorAlertDismissed () {
      this.errors = {};
    },
  },
};
</script>

<template>
  <div class="container">
    <div
      v-if="statusIsPending"
      class="loader-container"
    >
      <PulseLoader
        class="loader"
        color="blue"
        size="25px"
      />
    </div>
    <b-alert
      v-else-if="statusIsError"
      variant="danger"
      class="alerts"
      show="true"
      dismissible
      fade
      @dismissed="onErrorAlertDismissed"
    >
      An error has occurred!
      <ul
        class="error-messages"
      >
        <li
          v-for="(v, k) in errors"
          :key="k"
        >
          <strong>{{ k }}</strong> {{ v }}
        </li>
      </ul>
    </b-alert>
    <b-alert
      v-else-if="statusIsSuccess"
      variant="success"
      class="alerts"
      show="true"
      dismissible
      fade
    >
      User Updated:
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
      v-if="showForm"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
    >
      <div class="main-form">
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
          id="input-group-company"
          label="Company:"
          label-for="input-company"
        >
          <b-form-input
            id="input-company"
            v-model="form.company"
            required
            placeholder="Enter Company"
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
            :options="founderStates"
            required
          />
        </b-form-group>
      </div>
      <b-button
        v-if="determineCanSubmit"
        type="submit"
        block
        variant="primary"
        class="form-btn"
      >
        Submit
      </b-button>
      <b-button
        v-else
        type="fake-submit"
        block
        disabled
        variant="primary"
        class="form-btn"
      >
        Submit
      </b-button>
      <b-button
        type="reset"
        block
        variant="danger"
        class="form-btn"
      >
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<style scoped lang="sass">
  .container
    .loader-container
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
    .main-form
      text-align: left
      color: #039
      .form-btn
        display: inline-flex
        flex-direction: row
        justify-content: space-around
        width: 10vw
        height: 2.5rem
        font-size: 16px
        margin: 10px
        font-weight: bold
  .alerts
    text-align: center
    padding-left: 3.75rem
    ul
      margin: 0
      padding: 0
      li
        list-style: none
</style>
