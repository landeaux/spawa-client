<script>
/*
 * WATCH_THRESHOLD controls how much of the video must be watched before
 * allowing the user to continue.
 */
const WATCH_THRESHOLD = 0.9;

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
    durationInMs: 0,
    player: {},
    state: 'init',
    timer: 0,
    videoId: 'jwLZVMI3q70',
    videoWatched: false,
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
      const durationInMs = this.player.getDuration() * 1000;
      const currentTimeInMs = this.player.getCurrentTime() * 1000;
      const timeout = (durationInMs * WATCH_THRESHOLD) - currentTimeInMs;
      this.timer = setTimeout(() => {
        this.videoWatched = true;
      }, timeout);
    },
    onPaused () {
      this.state = 'paused';
      clearTimeout(this.timer);
    },
    onEnded () {
      this.state = 'ended';
      this.videoWatched = true;
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
    onReplayButtonClicked () {
      this.autoplay = 1;
      this.state = 'init';
    },
  },
};
</script>

<template>
  <div id="view">
    <PulseLoader
      v-if="showLoader"
      class="loader"
      color="blue"
      size="25px"
    />
    <transition name="fade">
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
    </transition>
    <button
      v-if="showReplayButton"
      class="btn btn-primary"
      @click="onReplayButtonClicked"
    >
      Replay Video
    </button>
    <transition name="fade">
      <button
        v-if="videoWatched"
        class="btn btn-primary"
        @click="onNextButtonClicked"
      >
        Next
      </button>
    </transition>
  </div>
</template>

<style scoped lang="sass">
  .fade-enter-active, .fade-leave-active
    transition: opacity 1s

  .fade-enter, .fade-leave-to
    opacity: 0
</style>
