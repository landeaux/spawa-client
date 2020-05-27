<script>
import { UPDATE_USER_BY_ID } from '@/store/actions.type';
import { createNamespacedHelpers } from 'vuex';
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';

const { mapActions } = createNamespacedHelpers('user');

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
    TextInputWithValidation: () => import('@/components/TextInputWithValidation'),
    ValidationObserver,
    ValidationProvider,
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
      responseErrors: {},
      form: {
        // Note: these prop names must exactly match user prop names
        username: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: '',
        active: true,
        role: '',
        state: '',
      },
      initialForm: {},
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
      show: true,
    };
  },
  computed: {
    fieldsHaveChanged () {
      return Object.keys(this.form).some((field) => {
        if (Object.prototype.hasOwnProperty.call(this.initialForm, field)) {
          return this.form[field] !== this.initialForm[field];
        }
        return false;
      });
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
    this.hydrateForm();
  },
  methods: {
    ...mapActions({
      updateUserById: UPDATE_USER_BY_ID,
    }),
    clearErrors () {
      this.responseErrors = {};
    },
    /**
     * Generates a payload object of the fields to update for the user by
     * copying the form values and deleting those fields which have not changed
     * from the original values.
     */
    generatePayload () {
      // make a copy of the form for moulding into the payload
      const payload = { ...this.form };

      // delete the confirm password field as we don't need to save it
      delete payload.confirmPassword;

      // for each field on the payload
      Object.keys(payload).forEach((field) => {
        // check if initialForm has a matching field with the payload
        if (Object.prototype.hasOwnProperty.call(this.initialForm, field)) {
          // if field hasn't changed from initial value
          if (payload[field] === this.initialForm[field]) {
            // then let's get rid of it
            delete payload[field];
          }
        }
      });

      return payload;
    },
    hydrateForm () {
      Object.keys(this.form).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(this.user, key)) {
          this.form[key] = this.user[key];
        }
      });
      this.initialForm = { ...this.form };
    },
    async onSubmit () {
      this.clearErrors();
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
        this.resetForm();
        this.$refs.form.reset();
        this.status = SUCCESS;
      } catch ({ response }) {
        const { errors } = response.data;
        this.status = ERROR;
        this.responseErrors = errors;
      }
    },
    onReset (reset) {
      this.createdUsername = '';
      this.resetForm();
      this.clearErrors();
      this.status = INIT;

      // reset form validation state
      reset();
    },
    onErrorAlertDismissed () {
      this.clearErrors();
    },
    resetForm () {
      this.form.password = '';
      this.form.confirmPassword = '';
      this.hydrateForm();
    },
    submitDisabled (invalid, pristine) {
      return invalid || pristine || !this.fieldsHaveChanged;
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
      :show="true"
      variant="danger"
      class="alerts"
      dismissible
      fade
      @dismissed="onErrorAlertDismissed"
    >
      An error has occurred!
      <ul
        class="error-messages"
      >
        <li
          v-for="(v, k) in responseErrors"
          :key="k"
        >
          <strong>{{ k }}</strong> {{ v }}
        </li>
      </ul>
    </b-alert>
    <b-alert
      v-else-if="statusIsSuccess"
      :show="true"
      variant="success"
      class="alerts"
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
            rules="password:@confirm-password"
            type="password"
            vid="password"
          />
          <TextInputWithValidation
            id="confirm-password"
            v-model="form.confirmPassword"
            label="Confirm Password"
            placeholder="Re-type Password"
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

          <ValidationProvider
            v-slot="{ errors, ariaInput, ariaMsg, failed, passed }"
            name="Role"
            rules="required"
            vid="role"
          >
            <b-form-group
              id="input-group-role"
              label="Role"
              label-for="input-role"
            >
              <b-form-select
                id="input-role"
                v-model="form.role"
                :options="roles"
                required
                size="lg"
                v-bind="ariaInput"
              />
              <b-form-invalid-feedback
                id="input-role-feedback"
                :state="passed"
                v-bind="ariaMsg"
              >
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            v-if="form.role === 'founder'"
            v-slot="{ errors, ariaInput, ariaMsg, failed, passed }"
            name="State"
            rules="required_if:role"
          >
            <b-form-group
              id="input-group-state"
              label="State"
              label-for="input-state"
            >
              <b-form-select
                id="input-state"
                v-model="form.state"
                :options="founderStates"
                size="lg"
                v-bind="ariaInput"
              />
              <b-form-invalid-feedback
                id="input-state-feedback"
                :state="passed"
                v-bind="ariaMsg"
              >
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <b-button
          type="submit"
          :disabled="submitDisabled(invalid, pristine)"
          variant="primary"
          class="form-btn"
        >
          Submit
        </b-button>
        <b-button
          type="reset"
          :disabled="!fieldsHaveChanged"
          variant="danger"
          class="form-btn"
        >
          Reset
        </b-button>
      </b-form>
    </ValidationObserver>
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
