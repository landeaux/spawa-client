<script>
import {
  DOWNLOAD_PITCH_DECK,
  FETCH_PITCH_DECK_BY_ID,
} from '@/store/actions.type';
import {
  mapActions,
  mapGetters,
} from 'vuex';

/**
 * VUEX module names
 */
const AUTH = 'auth';
const PITCH_DECK = 'pitchDeck';

/**
 * Other constants
 */
const MIN_REVIEW_COUNT = 4;
// #todo Will need to make this update-able by admins somehow
const YT_VIDEO_ID = 'jwLZVMI3q70';

/**
 * FounderDashboard
 *
 * The Founder dashboard component.
 */
export default {
  name: 'FounderDashboard',
  components: {
    SubmitPitchDeckModal: () => import('@/components/SubmitPitchDeckModal'),
    FounderReviewModal: () => import('@/components/FounderReviewModal'),
    BigButtonComponent: () => import('@/components/BigButtonComponent'),
  },
  data: () => ({
    videoId: YT_VIDEO_ID,
    pitchDeck: {},
  }),
  computed: {
    ...mapGetters({
      currentUser: `${AUTH}/currentUser`,
    }),
    statusBadgeVariant () {
      if (this.pitchDeck.status === 'UNDER_REVIEW') {
        return 'info';
      } else if (this.pitchDeck.status === 'ACCEPTED') {
        return 'success';
      } else {
        return 'danger';
      }
    },
    statusBadgeText () {
      if (this.pitchDeck.status === 'UNDER_REVIEW') {
        return 'UNDER REVIEW';
      } else if (this.pitchDeck.status === 'ACCEPTED') {
        return 'ACCEPTED';
      } else {
        return 'NOT ACCEPTED';
      }
    },
    instructText () {
      if (this.pitchDeck.status === 'UNDER_REVIEW') {
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
      } else if (this.pitchDeck.status === 'ACCEPTED') {
        return `
          Your pitch deck has been accepted by StartUpNV's Reviewers. You can
          click the "See My Feedback" button  to see your recent reviews.You may
          now select the "Book a Pitch Date" button to book a date to pitch your
          pitch deck with StartUpNV.
        `;
      } else {
        return `
          Your pitch deck has not been accepted by StartUpNV's Reviewers. You can
          click the "See My Feedback" button  to see your recent reviews.
        `;
      }
    },
    reviewCount () {
      if (this.pitchDeck.reviews !== undefined) {
        return this.pitchDeck.reviews.length;
      } else {
        return '';
      }
    },
    feedbackButtonDisabled () {
      return this.reviewCount < MIN_REVIEW_COUNT;
    },
    showResubmitPitchDeckButton () {
      // #todo Make dynamic based on user pitch deck lock date and status
      return this.pitchDeck.status === 'NOT_READY' ||
        this.pitchDeck.status === 'NEEDS_REWORK';
    },
  },
  async created () {
    // grab the user's pitchDeck ...
    const response = await this.fetchPitchDeckById(this.currentUser.pitchDeck);
    this.pitchDeck = response.pitchDeck;
  },
  methods: {
    ...mapActions({
      fetchPitchDeckById: `${PITCH_DECK}/${FETCH_PITCH_DECK_BY_ID}`,
      downloadPitchDeck: `${PITCH_DECK}/${DOWNLOAD_PITCH_DECK}`,
    }),
    onDownloadButtonClick () {
      this.downloadPitchDeck({
        id: this.currentUser.pitchDeck,
      });
    },
    onFeedbackButtonClick () {
      if (!this.feedbackButtonDisabled) {
        this.$refs['see-review-modal'].show();
      }
    },
    onResubmitPitchDeckButtonClick () {
      this.$refs['resubmit-pitchdeck-modal'].show();
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
          @click.native="onFeedbackButtonClick"
        />
        <b-modal
          id="seeReviewModal"
          ref="see-review-modal"
          size="lg"
          centered
          :hide-footer="true"
          title="My Reviews"
        >
          <FounderReviewModal
            :pitch-deck="pitchDeck"
          />
        </b-modal>
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
        <b-modal
          id="resubmitPitchDeckModal"
          ref="resubmit-pitchdeck-modal"
          size="lg"
          centered
          :hide-footer="true"
          title="Resubmit Pitchdeck"
        >
          <SubmitPitchDeckModal />
        </b-modal>
      </div>
    </div>
  </div>
</template>

<style scoped lang='sass'>
  h1, h2
    color: #039
  p, .instruct-text
    color: #007bff
  .main-flex
    display: flex
    flex-direction: row
    margin-top: 5%
    margin-left: 10%
    margin-right: 10%
  .column
    flex: 50%
    display: flex
    flex-direction: column
    align-items: center
  .instruct-text
    text-align: left
  .right-flex
    margin-top: 10px
  .small-btn
    height: 4rem
    border-radius: 8px
  .btn, .big-button
    width: 70% !important
  .stat-display
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    width: 100%
    border-radius: 8px
    background: rgba(40, 216, 255, 0.39)
    padding: 10px
    color: #039
    font-size: 20px
    margin-bottom: 20px
  .status
    font-weight: bold
</style>
