<script>
import { createNamespacedHelpers } from 'vuex';
import { DOWNLOAD_PITCH_DECK } from '@/store/actions.type';

const { mapActions } = createNamespacedHelpers('pitchDeck');
const { mapGetters } = createNamespacedHelpers('auth');

const MIN_REVIEW_COUNT = 4;
// #todo Will need to make this updatable by admins somehow
const YT_VIDEO_ID = 'jwLZVMI3q70';

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
    videoId: YT_VIDEO_ID,
  }),
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
    statusBadgeVariant () {
      // #todo Make dynamic based on user's status
      return 'info';
    },
    statusBadgeText () {
      // #todo Make dynamic based on user's status
      return 'UNDER REVIEW';
    },
    instructText () {
      // #todo Make dynamic based on user's status
      return `
        Your pitch deck has been submitted and is under review by StartUpNV's
        Reviewers. Once you have four or more reviews, the "See My Feedback"
        button will be enabled and you can click it to see your recent reviews.
        Additionally, once you have over four reviews, an admin will either
        accept your pitch deck or send it back for re-work. If your pitch deck
        was accepted, your status will change to "ACCEPTED" and you will be
        given the next steps on what to do. If your pitch deck is sent back for
        re-work, your status will remain in "UNDER REVIEW" and you will be able
        review your feedback and re-submit a new version of your pitch deck.
        Finally, if your pitch deck is not approved after the third submission,
        then your status will change to "NOT APPROVED".
      `;
    },
    reviewCount () {
      // #todo Make dynamic based on the number of reviews on their pitchdeck
      return 0;
    },
    feedbackButtonDisabled () {
      return this.reviewCount < MIN_REVIEW_COUNT;
    },
    showResubmitPitchDeckButton () {
      // #todo Make dynamic based on user pitch deck lock date
      return true;
    },
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
    onFeedbackButtonClick () {
      // #todo trigger modal window showing all reviews on pitchdeck
      console.log('onFeedbackButtonClick triggered!');
      if (!this.feedbackButtonDisabled) {
        // only trigger modal if the button is not disabled
      }
    },
    onResubmitPitchDeckButtonClick () {
      // #todo trigger modal window for re-submitting the pitch deck
      console.log('onResubmitPitchDeckButtonClick triggered!');
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
          <span>Status Of My Pitch Deck:</span>
          <b-badge
            :variant="statusBadgeVariant"
            class="status"
          >
            {{ statusBadgeText }}
          </b-badge>
        </div>
        <h2>What Should I Do Now?</h2>
        <div class="instruct-text">
          {{ instructText }}
        </div>
      </div>
      <div class="column">
        <BigButtonComponent
          title="See My Feedback"
          subtitle="Total Reviews: "
          :info="reviewCount"
          class="right-flex big-button"
          :disabled="feedbackButtonDisabled"
          @click="onFeedbackButtonClick"
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
          v-if="showResubmitPitchDeckButton"
          type="button"
          class="right-flex btn btn-primary small-btn"
          @click="onResubmitPitchDeckButtonClick"
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
  .btn, .big-button {
    width: 70% !important;
  }
  .stat-display {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    background: rgba(40, 216, 255, 0.39);
    padding: 10px;
    color: #039;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .status{
    font-weight: bold;
  }
</style>
