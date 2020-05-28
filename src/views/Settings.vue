<script>
import {
  createNamespacedHelpers,
} from 'vuex';
import {
  UPDATE_USER,
} from '@/store/actions.type';
import {
  ValidationObserver,
} from 'vee-validate';

const {
  mapActions,
  mapGetters,
} = createNamespacedHelpers('auth');

/**
 * component states
 */
const INIT = 'INIT';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

/**
 * other constants
 */
const TOAST_TIMEOUT = 10000; // timeout in ms

/**
 * TheSettings
 *
 * The Settings view.
 */
export default {
  name: 'TheSettings',
  components: {
    ValidationObserver,
    TextInputWithValidation: () => import('@/components/TextInputWithValidation'),
  },
  data: () => ({
    state: INIT,
    showToast: false,
    toastTimer: null,
    form: {
      username: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
    },
    initialForm: {},
  }),
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
    stateIsInit () {
      return this.state === INIT;
    },
    stateIsSuccess () {
      return this.state === SUCCESS;
    },
    toastMessage () {
      if (this.stateIsInit) return '';
      return this.stateIsSuccess
        ? 'Profile Updated!'
        : 'There was an error updating your profile.';
    },
    toastVariant () {
      return this.stateIsSuccess
        ? 'success'
        : 'danger';
    },
    fieldsHaveChanged () {
      return Object.keys(this.form).some((field) => {
        if (Object.prototype.hasOwnProperty.call(this.initialForm, field)) {
          return this.form[field] !== this.initialForm[field];
        }
        return false;
      });
    },
  },
  created () {
    this.hydrateForm();
  },
  methods: {
    ...mapActions({
      updateUser: UPDATE_USER,
    }),
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
        if (Object.prototype.hasOwnProperty.call(this.currentUser, key)) {
          this.form[key] = this.currentUser[key];
        }
      });
      this.initialForm = { ...this.form };
    },
    submitDisabled (invalid, pristine) {
      return invalid || pristine || !this.fieldsHaveChanged;
    },
    async onSubmit () {
      const payload = this.generatePayload();
      try {
        await this.updateUser(payload);
        this.state = SUCCESS;
        this.hydrateForm();
      } catch (error) {
        this.state = ERROR;
      }
      this.showToast = true;
      this.toastTimer = setTimeout(() => {
        this.showToast = false;
      }, TOAST_TIMEOUT);
    },
    onToastDismissed () {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }
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
          <b-alert
            v-model="showToast"
            class="mb-3 rounded-1"
            :variant="toastVariant"
            dismissible
            fade
            @dismissed="onToastDismissed"
          >
            {{ toastMessage }}
          </b-alert>
          <ValidationObserver
            ref="form"
            v-slot="{ handleSubmit, invalid, pristine }"
            tag="div"
          >
            <form @submit.prevent="handleSubmit(onSubmit)">
              <fieldset>
                <TextInputWithValidation
                  id="username"
                  v-model="form.username"
                  label="Username"
                  type="text"
                  rules="alpha_num"
                  required
                />
                <TextInputWithValidation
                  id="email"
                  v-model="form.email"
                  label="Email"
                  type="email"
                  required
                />
                <TextInputWithValidation
                  id="company"
                  v-model="form.company"
                  label="Company"
                  type="text"
                  required
                />
                <TextInputWithValidation
                  id="password"
                  v-model="form.password"
                  label="Password"
                  rules="password:@confirm-password"
                  type="password"
                  vid="password"
                />
                <TextInputWithValidation
                  id="confirm-password"
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  rules="password:@password"
                  type="password"
                  vid="confirm-password"
                />
                <b-button
                  :disabled="submitDisabled(invalid, pristine)"
                  type="submit"
                  variant="primary"
                >
                  Update Settings
                </b-button>
              </fieldset>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
