<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BookPitchDate',
  components: {
    HubSpotFormWidget: () => import('@/components/HubSpotFormWidget'),
  },
  data () {
    return {
      formSubmitted: false,
      // NOTE: These keys must be the exactly as they are in the Hubspot form
      prefill: {
        email: '',
        user_id: '',
      },
      formBaseUrl: process.env.VUE_APP_HUBSPOT_EAPP_FORM_URL,
      userPopulated: false,
      widgetLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  watch: {
    currentUser () {
      this.userPopulated = Object.entries(this.currentUser).length > 0;
      if (this.userPopulated) {
        this.prefill.email = this.currentUser.email;
        this.prefill.user_id = this.currentUser.id;
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
    <h1>Submit Eapp</h1>
    <p>Please fill out the Entrepreneur Form below:</p>
    <router-link
      v-if="formSubmitted"
      :to="{ name: 'home' }"
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
      v-if="userPopulated"
      class="widget"
      :form-base-url="formBaseUrl"
      :prefill="prefill"
      @form-submitted="onFormSubmitted"
    />
  </div>
</template>

<style scoped lang="sass">
@import '../assets/sass/vars'
#view
  display: flex
  flex-direction: column
  .loader
    position: relative
    height: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
  .widget
    flex-basis: 100%
</style>
