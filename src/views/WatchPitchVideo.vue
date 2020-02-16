<script>
/**
 * WatchPitchVideo
 */
export default {
  name: 'WatchPitchVideo',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data: () => ({
    autoplay: 0,
    player: {},
    showNextButton: true,
    state: 'init',
    videoId: 'jwLZVMI3q70',
  }),
  computed: {
    showLoader () {
      return this.state === 'init';
    },
    showPlayer () {
      return this.state !== 'ended';
    },
    showReplayButton () {
      return this.state === 'ended';
    },
  },
  methods: {
    onReady (e) {
      this.state = 'ready';
      this.player = e.target;
    },
    onBuffering () {
      this.state = 'buffering';
    },
    onPlaying () {
      this.state = 'playing';
    },
    onPaused () {
      this.state = 'paused';
    },
    onEnded () {
      this.state = 'ended';
    },
    onQued () {
      this.state = 'qued';
    },
    onError (error) {
      this.state = 'error';
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    },
    onNextButtonClicked () {
      this.$router.push('submit-pitch-deck');
    },
    replayVideo () {
      this.autoplay = 1;
      this.state = 'init';
    },
  },
};
</script>

<template>
  <div>
    <button
      v-if="showNextButton"
      class="btn btn-primary"
      @click="onNextButtonClicked"
    >
      Next
    </button>
    <PulseLoader
      v-if="showLoader"
      class="loader"
      color="blue"
      size="25px"
    />
    <YouTubePlayer
      v-if="showPlayer"
      :video-id="videoId"
      :player-vars="{ autoplay }"
      @buffering="onBuffering"
      @ready="onReady"
      @playing="onPlaying"
      @paused="onPaused"
      @ended="onEnded"
      @qued="onQued"
      @error="onError"
    />
    <button
      v-if="showReplayButton"
      class="btn btn-primary"
      @click="replayVideo"
    >
      Replay Video
    </button>
  </div>
</template>

<style scoped lang="sass">

</style>
