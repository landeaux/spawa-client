<script>
import { createNamespacedHelpers } from 'vuex';
import { DOWNLOAD_PITCH_DECK } from '@/store/actions.type';

const { mapActions } = createNamespacedHelpers('pitchDeck');
const { mapGetters } = createNamespacedHelpers('auth');

/**
 * FounderDashboard
 *
 * The Founder dashboard component.
 */
export default {
  name: 'FounderDashboard',
  components: {
    BigButtonComponent: () => import('@/components/BigButtonComponent'),
  },
  data: () => ({
    videoId: 'jwLZVMI3q70',
  }),
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  methods: {
    ...mapActions({
      downloadPitchDeck: DOWNLOAD_PITCH_DECK,
    }),
    onDownloadButtonClick () {
      this.downloadPitchDeck({
        id: this.currentUser.pitchDeck,
      });
    },
  },
};
</script>

<template>
  <div id="view">
    <div class="greeting">
      <h1>Founder Dashboard</h1>
      <p>Welcome back, {{ currentUser.username }}!</p>
    </div>
    <div class="main-flex">
      <div class="column">
        <div class="stat-display">
          Status Of My Pitch Deck:
          <b-badge
            variant="light"
            class="status"
          >
            APPROVED
          </b-badge>
        </div>
        <h2>What Should I Do Now?</h2>
        <div class="instruct-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Praesent sapien neque, tempor nec magna ac, tristique
          sollicitudin sapien. Nullam placerat interdum ex, eget
          vehicula eros sodales eu. Aenean non fermentum orci.
          Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.
          Vivamus eleifend feugiat nisl ac luctus.
        </div>
      </div>
      <div class="column">
        <BigButtonComponent
          title="See My Feedback"
          subtitle="Total Reviews: "
          info="10"
          class="right-flex"
        />

        <button
          v-b-modal.vid-model
          type="button"
          class="right-flex btn btn-primary small-btn"
        >
          Re-watch Pitch Process Video
        </button>
        <b-modal
          id="vid-model"
          size="lg"
          centered
          title="Pitch Process Video"
        >
          <YouTubePlayer
            :video-id="videoId"
            player-width="100%"
            class="text-center"
          />
        </b-modal>

        <button
          type="button"
          class="right-flex btn btn-primary small-btn"
          @click="onDownloadButtonClick"
        >
          Download Pitch Deck
        </button>

        <button
          type="button"
          class="right-flex btn btn-primary small-btn"
        >
          Re-submit Pitch Deck
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped >
  h1, h2 {
    color: #039;
  }
  p, .instruct-text {
    color: #007bff;
  }
  .main-flex {
    display: flex;
    flex-direction: row;
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .column {
    flex: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .instruct-text {
    text-align: left;
  }
  .right-flex {
    margin-top: 10px;
  }
  .small-btn {
    height: 4rem;
    border-radius: 8px;
  }
  .btn {
    width: 70%;
  }
  .stat-display {
    margin-top: 1%;
    margin-bottom: 5%;
    width: 100%;
    border-radius: 8px;
    background: rgba(40, 216, 255, 0.39);
    padding: 5px;
    color: #039;
    text-align: left;
    font-size: 20px;
  }
  .status{
    font-weight: bold;
    width: 100%;
    color: #039;
  }
</style>
