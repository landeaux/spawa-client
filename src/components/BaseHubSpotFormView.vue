<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BaseHubSpotFormView',
  components: {
    HubSpotFormWidget: () => import('@/components/HubSpotFormWidget'),
  },
  props: {
    /**
     * The form instructions
     */
    instructions: {
      default: '',
      required: false,
      type: String,
    },
    /**
     * The base form url
     */
    formBaseUrl: {
      default: '',
      required: true,
      type: String,
    },
    /**
     * An object containing key/value pairs where the key is the HubSpot form
     * field key to pre-fill and the value is the app-side user prop containing
     * the value we want to pre-fill with.
     *
     * e.g., To fill the 'user_id' and 'email' fields on the form with the
     * current user's mongodb id and email address we would pass:
     * {
     *   user_id: 'id',
     *   email: 'email',
     * }
     */
    prefillKeyMap: {
      default: () => ({}),
      required: false,
      type: Object,
    },
    /**
     * The name of the router view to send the user to after form submission
     */
    routerLinkTo: {
      default: 'home',
      required: true,
      type: String,
    },
    /**
     * The success message to display to the user to after form submission
     */
    successMessage: {
      default: 'Thank you for submitting the form! Click "Next" to continue.',
      required: false,
      type: String,
    },
    /**
     * The title of the form
     */
    title: {
      default: '',
      required: true,
      type: String,
    },
  },
  data () {
    return {
      formSubmitted: false,
      prefill: {},
      widgetLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    showHubSpotFormWidget () {
      return this.userPopulated && !this.formSubmitted;
    },
    userPopulated () {
      return this.currentUser && Object.entries(this.currentUser).length > 0;
    },
  },
  created () {
    Object.keys(this.prefillKeyMap).forEach(key => {
      const userProp = this.prefillKeyMap[key];
      if (Object.prototype.hasOwnProperty.call(this.currentUser, userProp)) {
        this.prefill[key] = this.currentUser[userProp];
      }
    });
  },
  methods: {
    onFormSubmitted () {
      this.formSubmitted = true;
    },
    onNextButtonClick () {
      this.$emit('next-button-click');
    },
  },
};
</script>

<template>
  <div id="view">
    <h1>{{ title }}</h1>
    <p>{{ instructions }}</p>
    <HubSpotFormWidget
      v-if="showHubSpotFormWidget"
      class="widget"
      :form-base-url="formBaseUrl"
      :prefill="prefill"
      @form-submitted="onFormSubmitted"
    />
    <p
      v-if="formSubmitted"
      class="message"
    >
      {{ successMessage }}
    </p>

    <button
      v-if="formSubmitted"
      type="button"
      class="btn btn-primary next-button"
      @click="onNextButtonClick"
    >
      Next
    </button>

    <button
      v-else
      type="button"
      class="btn btn-primary next-button"
      style="cursor: not-allowed"
      disabled
      title="Please fill out the form to continue."
    >
      Please Fill Out The Form To Continue
    </button>
  </div>
</template>

<style scoped lang="sass">
@import '../assets/sass/vars'
#view
  display: flex
  flex-direction: column
  .loader, .message
    position: relative
    height: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
  .widget
    flex-basis: 100%
  h1
    color: #039
  p
    color: #007bff
  .next-button
    min-width: 30vw
</style>
