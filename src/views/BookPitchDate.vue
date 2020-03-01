<script>
import { mapGetters } from 'vuex';
import CalendlyWidget from '../components/CalendlyWidget';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'BookPitchDate',
  components: {
    CalendlyWidget,
    PulseLoader,
  },
  data () {
    return {
      state: 'init',
      prefill: {
        email: '',
      },
      url: 'https://calendly.com/spawa-dev/pitch-presentation?hide_event_type_details=0',
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    showLoader () {
      return this.state === 'init';
    },
    nextButtonDisabled () {
      return this.state !== 'event_scheduled';
    },
    nextButtonTitle () {
      return this.nextButtonDisabled
        ? 'Please select a date and time slot below'
        : 'Click next to continue';
    },
    nextButtonStyle () {
      return this.nextButtonDisabled
        ? 'cursor: not-allowed'
        : '';
    },
  },
  created () {
    this.prefill.email = this.currentUser.email;
  },
  methods: {
    dateAndTimeSelectedHandler () {
      this.state = 'date_and_time_selected';
    },
    eventScheduledHandler () {
      this.state = 'event_scheduled';
    },
    eventTypeViewedHandler () {
      this.state = 'event_type_viewed';
    },
    loadHandler () {
      this.$nextTick().then(() => {
        this.state = 'widget_loaded';
      });
    },
    onNextButtonClick () {
      if (this.state === 'event_scheduled') {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>

<template>
  <div id="view">
    <h1>Book A Pitch Date</h1>
    <p>Select from the available date and time slots below.</p>
    <button
      type="button"
      class="btn btn-primary next-button"
      :disabled="nextButtonDisabled"
      :title="nextButtonTitle"
      :style="nextButtonStyle"
      @click="onNextButtonClick"
    >
      Next
    </button>
    <PulseLoader
      v-if="showLoader"
      class="loader"
      color="blue"
      size="25px"
    />
    <CalendlyWidget
      class="calendly"
      :height="650"
      :prefill="prefill"
      :url="url"
      @date-and-time-selected="dateAndTimeSelectedHandler"
      @event-scheduled="eventScheduledHandler"
      @event-type-viewed="eventTypeViewedHandler"
      @load="loadHandler"
    />
  </div>
</template>

<style scoped lang="sass">
@import '../assets/sass/vars'
#view
  .loader
    position: relative
    height: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
</style>
