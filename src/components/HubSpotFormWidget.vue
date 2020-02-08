<script>
export default {
  name: 'HubSpotFormWidget',
  props: {
    /**
     * The prefill options to populate in the widget
     */
    prefill: {
      default: () => ({}),
      type: Object,
    },
  },
  data () {
    return {
      dev: process.env.NODE_ENV === 'development',
      formBaseUrl: 'https://share.hsforms.com/1ktXh4Wg7TJqlpYPRbgzGIQ47uvd',
      iframeLoading: true,
    };
  },
  computed: {
    iframeSrc () {
      return this.formBaseUrl + this.queryString;
    },
    queryString () {
      let result = '';
      const prefillCopy = { ...this.prefill };
      if (Object.entries(prefillCopy).length > 0 &&
        prefillCopy.constructor === Object) {
        result += '?';
        Object.keys(prefillCopy).forEach(key => {
          const value = prefillCopy[key];
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
      this.messageEventHandler
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
    messageEventHandler (event) {
      // #todo Need to emit the appropriate event to the parent
      if (this.isHubSpotEvent(event)) {
        console.log(event);
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
      gesture="media"
      allow="encrypted-media"
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
