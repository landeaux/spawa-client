<script>
import calendly from '@/assets/calendlyWidget';

export default {
  name: 'VueCalendly',
  props: {
    height: {
      default: 600,
      type: Number,
    },
    prefill: {
      default: () => ({}),
      type: Object,
    },
    url: {
      required: true,
      type: String,
    },
    utm: {
      default: () => ({}),
      type: Object,
    },
  },
  created () {
    window.addEventListener(
      'message',
      this.emitCalendlyEvent
    );
  },
  mounted () {
    const vm = this;
    calendly.widget({
      onLoad (e) {
        vm.$emit('load', e);
      },
      parentElement: this.$el,
      prefill: this.prefill,
      url: this.url,
      utm: this.utm,
    });
  },
  methods: {
    isCalendlyEvent (event) {
      return event.data.event && event.data.event.indexOf('calendly') === 0;
    },
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
    class="calendly"
    :style="{ 'height' : height + 'px' }"
    :data-url="url"
  ></div>
</template>

<style lang="scss">
  .calendly {}
</style>
