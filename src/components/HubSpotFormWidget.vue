<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'HubSpotFormWidget',
  components: {
    PulseLoader,
  },
  props: {
    /**
     * The base form url to load in the iframe
     */
    formBaseUrl: {
      default: '',
      required: true,
      type: String,
    },
    /**
     * The prefill options to populate in the widget
     */
    prefill: {
      default: () => ({}),
      required: false,
      type: Object,
    },
  },
  data () {
    return {
      dev: process.env.NODE_ENV === 'development',
      iframeLoading: true,
    };
  },
  computed: {
    /**
     * The iframe source url composed of the base form url and query string for
     * pre-populating form fields.
     *
     * @public
     * @returns {string}
     */
    iframeSrc () {
      return this.formBaseUrl + this.queryString;
    },
    /**
     * Generates a uri encoded query string for use in pre-populating form
     * fields.
     *
     * @public
     * @returns {string}
     */
    queryString () {
      let result = '';

      /*
       * Since vue adds extra getters/setters for reactivity, and since we only
       * want the plain key/value pairs, we need to make a copy of it first.
       */
      const prefillCopy = { ...this.prefill };

      // Generate our query string based on each prefill key/value pair
      if (Object.entries(prefillCopy).length > 0 &&
        prefillCopy.constructor === Object) {
        result += '?';
        Object.keys(prefillCopy).forEach(key => {
          let value = prefillCopy[key];
          value = encodeURIComponent(value); // make string safe for uri
          result += `${key}=${value}&`;
        });
        result = result.slice(0, -1); // remove the last '&'
      }
      return result;
    },
  },
  created () {
    // Start listening for messages from HubSpot
    window.addEventListener(
      'message',
      this.emitHubSpotEvent
    );
  },
  methods: {
    /**
     * iframe onload handler
     *
     * Triggered after the iframe's document.onreadystatechange triggers and the
     * documents readyState is complete.
     */
    onLoad () {
      this.iframeLoading = false;
    },
    /**
     * Checks if the message event received form event from HubSpot
     *
     * @public
     */
    isHubSpotFormEvent (event) {
      return event.data.type === 'hsFormCallback';
    },
    /**
     * Emits an event to the parent component based on the event received from
     * HubSpot.
     *
     * @public
     * @param event The MessageEvent object
     */
    emitHubSpotEvent (event) {
      if (this.isHubSpotFormEvent(event)) {
        const key = event.data.eventName;
        const events = {
          'onBeforeFormInit': 'before-form-init',
          'onBeforeValidationInit': 'before-validation-init',
          'onFormReady': 'form-ready',
          'onFormFailedValidation': 'form-failed-validation',
          'onFormSubmit': 'form-submit',
          'onFormSubmitted': 'form-submitted',
        };
        try {
          this.$emit(events[key], event);
        } catch (error) {
          if (this.dev) {
            console.error(error);
            console.warn(`Event key missing for eventName '${key}'`);
          }
        }
      }
    },
  },
};
</script>

<template>
  <div class="iframe-wrapper">
    <div v-if="dev">
      {{ iframeSrc }}
    </div>
    <PulseLoader
      v-if="iframeLoading"
      class="loader"
      color="blue"
      size="25px"
    />
    <vue-friendly-iframe
      ref="iframeEl"
      :style="{ 'display' : iframeLoading ? 'none' : 'block' }"
      :src="iframeSrc"
      frameborder="0"
      @load="onLoad"
    />
  </div>
</template>

<style lang="sass">
.iframe-wrapper
  width: 100%
  border: 0

  .loader
    position: relative
    height: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center

  .vue-friendly-iframe
    height: 100%
    width: 100%
    iframe
      height: 100%
      width: 100%
</style>
