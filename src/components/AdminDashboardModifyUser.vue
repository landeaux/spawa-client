<script>
import { mapGetters } from 'vuex';
import { UPDATE_USER_BY_ID } from '@/store/actions.type';

export default {
  name: 'AdminDashboardModifyUser',
  props: {
    user: {
      default: null,
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      form: null,
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
    determineCanSubmit () {
      return this.form.username !== this.user.username ||
        this.form.email !== this.user.email ||
        this.form.company !== this.user.company ||
        this.form.password !== this.user.password ||
        this.form.active !== this.user.active ||
        this.form.role !== this.user.role ||
        this.form.state !== this.user.state;
    },
  },
  created () {
    this.form = { ...this.user };
  },
  methods: {
    async onSubmit () {
      Object.keys(this.userErrors).forEach(k => delete this.userErrors[k]);
      if (this.form.role !== 'founder') { this.form.state = ''; }
      const payload = { ...this.form };

      // Remove props which didn't change or are empty
      Object.keys(this.form).forEach((key) => {
        if (this.form[key] === this.user[key] || this.form[key] === '') {
          delete payload[key];
        }
      });

      payload.id = this.user.id;
      await this.$store.dispatch(UPDATE_USER_BY_ID, payload);
      this.createdUsername = this.form.username;
      this.determineAlert();
      if (this.showSuccessAlert === true) { this.show = false; }
    },
    onReset () {
      // Reset our form values
      this.form = { ...this.user };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
      class="alerts"
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
      v-if="show"
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
            :options="states"
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

<style scoped lang = sass>
  .main-form
    width: 35vw
    text-align: left
    color: #039
    .alerts
      width: 35vw

    .form-btn
      display: inline-flex
      flex-direction: row
      justify-content: space-around
      width: 10vw
      height: 2.5rem
      font-size: 16px
      margin: 10px
      font-weight: bold
</style>
