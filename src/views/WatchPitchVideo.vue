<script>
import { UPDATE_USER_STATE } from '@/store/actions.type';
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
      this.$store.dispatch(UPDATE_USER_STATE, {
        state: 'take_pitch_quiz',
      });
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
    <h1>StartUpNV Pitch Video</h1>
    <p>Please watch the video below.</p>
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
      class="btn btn-primary next-button"
      @click="onReplayButtonClicked"
    >
      Replay Video
    </button>
    <transition name="fade">
      <button
        v-if="videoWatched"
        class="btn btn-primary next-button"
        @click="onNextButtonClicked"
      >
        Next
      </button>
    </transition>
  </div>
</template>

<style scoped lang="sass">
  #view
    .fade-enter-active, .fade-leave-active
      transition: opacity 3s
    .fade-enter, .fade-leave-to
      opacity: 0
    .next-button
      margin: 10px
      min-width: 30vw
    h1
      color: #039
    p
      color: #007bff
</style>
