<script>
import { mapGetters } from 'vuex';
// import CalendlyWidget from '../components/CalendlyWidget';
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'BookPitchDate',
  components: {
    HubSpotFormWidget: () => import('@/components/HubSpotFormWidget'),
    // CalendlyWidget,
    // PulseLoader,
  },
  data () {
    return {
      formSubmitted: false,
      // NOTE: These keys must be the exact same as they are for in Hubspot
      prefill: {
        firstname: '',
        email: '',
        user_id: '',
      },
      url: '', // #todo Need to set this equal to the base form url and pass into widget
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
        console.log('currentUser:', this.currentUser);
        this.prefill.firstname = this.currentUser.username;
        this.prefill.email = this.currentUser.email;
        this.prefill.user_id = this.currentUser.id;
      }
    },
  },
  methods: {
    loadHandler () {
      this.$nextTick().then(() => {
        this.widgetLoaded = true;
      });
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
      :prefill="prefill"
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
