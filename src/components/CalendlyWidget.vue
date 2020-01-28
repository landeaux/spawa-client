<script>
import Calendly from '@/assets/calendlyWidget';

/**
 * CalendlyWidget.vue
 *
 * This component embeds Calendly's inline widget.
 *
 * NOTE: It is HIGHLY recommended to pass v-bind:key="<your_key>" (or shorthand
 * :key="<your_key>") and changing the key when props values change from the
 * parent component. This will ensure that the component properly re-renders
 * with the new prop value(s).
 */
export default {
  name: 'CalendlyWidget',
  props: {
    /**
     * The height of the widget
     */
    height: {
      default: 600,
      type: Number,
    },
    /**
     * The prefill options to populate in the widget
     *
     * For example:
     *
     * ```
     * prefill: {
     *   name: 'Bozo the Clown',
     *   email: 'bozo@the.clown,
     *   customAnswers: {
     *     a1: 'Yes',
     *   },
     * }
     * ```
     */
    prefill: {
      default: () => ({}),
      type: Object,
    },
    /**
     * The URL of the calendly event or event list
     */
    url: {
      required: true,
      type: String,
    },
    /**
     * UTM (Urchin Tracking Module) codes
     */
    utm: {
      default: () => ({}),
      type: Object,
      validator: (value) => {
        let utmCodes = [
          'utmCampaign',
          'utmSource',
          'utmMedium',
          'utmContent',
          'utmTerm',
        ];
        return Object.keys(value).every(key => utmCodes.indexOf(key) !== -1);
      },
    },
  },
  data () {
    return {
      loaded: false,
    };
  },
  created () {
    // Start listening for messages from Calendly
    window.addEventListener(
      'message',
      this.emitCalendlyEvent
    );
  },
  mounted () {
    // Initialize the Calendly widget
    const vm = this;
    Calendly.widget({
      onLoad (e) {
        vm.$data.loaded = true;
        vm.$emit('load', e);
      },
      parentElement: this.$el,
      prefill: this.prefill,
      url: this.url,
      utm: this.utm,
    });
  },
  methods: {
    /**
     * Checks to see if a message received by the main thread is from Calendly.
     *
     * @public
     * @param event The MessageEvent object
     * @returns Boolean
     */
    isCalendlyEvent (event) {
      return event.data.event && event.data.event.indexOf('calendly') === 0;
    },
    /**
     * Emits an event to the parent component based on the event received from
     * Calendly.
     *
     * @public
     * @param event The MessageEvent object
     */
    emitCalendlyEvent (event) {
      if (this.isCalendlyEvent(event)) {
        const key = event.data.event;
        const events = {
          'calendly.profile_page_viewed': 'profile-page-viewed',
          'calendly.event_type_viewed': 'event-type-viewed',
          'calendly.date_and_time_selected': 'date-and-time-selected',
          'calendly.event_scheduled': 'event-scheduled',
        };
        this.$emit(events[key], event);
      }
    },
  },
};
</script>

<template>
  <div
    v-show="loaded"
    class="calendly"
    :style="{ 'height' : height + 'px' }"
    :data-url="url"
  ></div>
</template>

<style lang="sass">
.calendly
  position: relative
  height: 100%
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  width: 100%
</style>
