<script>
export default {
  name: 'HubSpotFormWidget',
  props: {
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
    iframeSrc () {
      return this.formBaseUrl + this.queryString;
    },
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
    onLoad () {
      console.log('iframe loaded');

      this.iframeLoading = false;
    },
    onIframeLoad () {
      console.log('iframe loaded');
    },
    isHubSpotEvent (event) {
      // #todo Need to make this dynamic with the url passed in
      return event.origin === 'https://share.hsforms.com';
    },
    /**
     * Emits an event to the parent component based on the event received from
     * HubSpot.
     *
     * @public
     * @param event The MessageEvent object
     */
    emitHubSpotEvent (event) {
      if (this.isHubSpotEvent(event)) {
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
    <div
      v-if="iframeLoading"
      class="iframe-loading"
    >
      iframe loading...
    </div>
    <div v-if="dev">
      {{ iframeSrc }}
    </div>
    <vue-friendly-iframe
      ref="iframeEl"
      :style="{ 'display' : iframeLoading ? 'none' : 'block' }"
      :src="iframeSrc"
      frameborder="0"
      @iframe-load="onIframeLoad"
      @load="onLoad"
    />
  </div>
</template>

<style lang="sass">
.iframe-wrapper
  width: 100%
  border: 0

  .vue-friendly-iframe
    height: 100%
    width: 100%
    iframe
      height: 100%
      width: 100%
</style>
