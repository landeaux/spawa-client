<script>
import calendly from '@/assets/calendlyWidget';

function isCalendlyEvent (e) {
  return e.data.event && e.data.event.indexOf('calendly') === 0;
}

window.addEventListener(
  'message',
  function (e) {
    if (isCalendlyEvent(e)) {
      console.log(e.data);
    }
  }
);

export default {
  name: 'VueCalendly',
  components: {},
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
  data () {
    return {};
  },
  computed: {},
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
  methods: {},
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
