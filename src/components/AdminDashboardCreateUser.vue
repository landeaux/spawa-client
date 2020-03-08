<script>
export default {
  name: 'AdminDashboardCreateUser',
  data () {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        active: [],
        role: '',
        state: '',
      },
      roles: [{ text: 'Select One', value: null }, 'Founder', 'Admin', 'Reviewer'],
      states: [{ text: 'Select One', value: null },
        'submit_eapp',
        'watch_pitch_video',
        'take_pitch_quiz',
        'submit_pitch_deck',
        'pitch_deck_review',
        'book_pitch_date',
        'pitch_accepted',
        'pitch_cancelled'],
      show: true,
    };
  },
  methods: {
    onSubmit (evt) {
      if (this.form.role !== 'Founder') { this.form.state = ''; }
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.username = '';
      this.form.password = '';
      this.form.active = [];
      this.form.role = '';
      this.form.state = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<template>
  <div id="view">
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

        <b-form-group id="input-group-active">
          <b-form-checkbox-group
            id="input-active"
            v-model="form.active"
          >
            <b-form-checkbox value="active">
              Active Account?
            </b-form-checkbox>
          </b-form-checkbox-group>
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
          v-if="form.role === 'Founder'"
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
</style>
