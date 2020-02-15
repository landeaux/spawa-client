<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BaseHubSpotFormView',
  components: {
    HubSpotFormWidget: () => import('@/components/HubSpotFormWidget'),
  },
  props: {
    description: {
      default: '',
      required: true,
      type: String,
    },
    formBaseUrl: {
      default: '',
      required: true,
      type: String,
    },
    // NOTE: These keys must be the exactly as they are in the Hubspot form
    prefillKeyMap: {
      default: () => ({}),
      required: false,
      type: Object,
    },
    routerLinkTo: {
      default: '',
      required: true,
      type: String,
    },
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
      userPopulated: false,
      widgetLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    showHubSpotFormWidget () {
      return this.userPopulated && !this.formSubmitted;
    },
  },
  watch: {
    currentUser () {
      this.userPopulated = Object.entries(this.currentUser).length > 0;
      if (this.userPopulated) {
        Object.keys(this.prefillKeyMap).forEach(key => {
          const userProp = this.prefillKeyMap[key];
          if (Object.prototype.hasOwnProperty.call(this.currentUser, userProp)) {
            this.prefill[key] = this.currentUser[userProp];
          }
        });
      }
    },
  },
  methods: {
    onFormSubmitted () {
      this.formSubmitted = true;
    },
  },
};
</script>

<template>
  <div id="view">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <router-link
      v-if="formSubmitted"
      :to="{ name: routerLinkTo }"
    >
      <button
        type="button"
        class="btn btn-primary next-button"
      >
        Next
      </button>
    </router-link>
    <button
      v-else
      type="button"
      class="btn btn-primary next-button"
      style="cursor: not-allowed"
      disabled
      title="Please fill out the form to continue."
    >
      Next
    </button>
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
      Thank you for submitting the form! Click 'Next' to continue.
    </p>
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
</style>
