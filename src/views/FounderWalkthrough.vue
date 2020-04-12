<script>
import { mapGetters } from 'vuex';

/**
 * FounderWalkthrough
 */
export default {
  name: 'FounderWalkthrough',
  components: {
    SubmitEapp: () => import('@/views/SubmitEapp'),
    WatchPitchVideo: () => import('@/views/WatchPitchVideo'),
    TakePitchQuiz: () => import('@/views/TakePitchQuiz'),
    SubmitPitchDeck: () => import('@/views/SubmitPitchDeck'),
    FounderDashboard: () => import('@/components/FounderDashboard'),
    Loader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  computed: {
    ...mapGetters(['currentUser']),
    viewComponent () {
      const componentKey = this.currentUser && this.currentUser.state
        ? this.currentUser.state
        : 'loader';
      return {
        submit_eapp: 'SubmitEapp',
        watch_pitch_video: 'WatchPitchVideo',
        take_pitch_quiz: 'TakePitchQuiz',
        submit_pitch_deck: 'SubmitPitchDeck',
        pitch_deck_review: 'FounderDashboard',
        loader: 'Loader',
      }[componentKey];
    },
    viewComponentProps () {
      return this.currentUser && this.currentUser.state
        ? {}
        : {
          color: 'blue',
          size: '25px',
        };
    },
    viewComponentClasses () {
      return this.viewComponent === 'Loader'
        ? 'loader'
        : 'component';
    },
  },
};
</script>

<template>
  <div id="view">
    <component
      :is="viewComponent"
      v-bind="viewComponentProps"
      :class="viewComponentClasses"
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
  .component
    flex-basis: 100%
</style>
