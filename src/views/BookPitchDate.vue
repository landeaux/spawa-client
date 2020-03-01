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
      dateAndTimeSelected: false,
      eventScheduled: false,
      eventTypeViewed: false,
      prefill: {
        email: '',
      },
      url: 'https://calendly.com/spawa-dev/pitch-presentation?hide_event_type_details=0',
      userPopulated: false,
      widgetLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  created () {
    this.prefill.email = this.currentUser.email;
  },
  methods: {
    dateAndTimeSelectedHandler () {
      this.dateAndTimeSelected = true;
    },
    eventScheduledHandler () {
      this.eventScheduled = true;
    },
    eventTypeViewedHandler () {
      this.eventTypeViewed = true;
    },
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
    <h1>Book A Pitch Date</h1>
    <p>Select from the available date and time slots below.</p>
    <router-link
      v-if="eventScheduled"
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
      title="Please select a date and time slot below"
    >
      Next
    </button>
    <PulseLoader
      v-if="!widgetLoaded"
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
