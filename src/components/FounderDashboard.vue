<script>
import {
  DOWNLOAD_PITCH_DECK,
  FETCH_PITCH_DECK_BY_ID,
  SUBMIT_PITCH_DECK_FOR_REVIEW,
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
    ReUploadPitchDeckModal: () => import('@/components/ReUploadPitchDeckModal'),
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
      return {
        NOT_READY: 'secondary',
        NEEDS_REWORK: 'warning',
        UNDER_REVIEW: 'primary',
        ACCEPTED: 'success',
        REJECTED: 'danger',
      }[this.pitchDeck.status];
    },
    statusBadgeText () {
      return {
        NOT_READY: 'NOT READY',
        NEEDS_REWORK: 'NEEDS REWORK',
        UNDER_REVIEW: 'UNDER REVIEW',
        ACCEPTED: 'ACCEPTED',
        REJECTED: 'NOT ACCEPTED',
      }[this.pitchDeck.status];
    },
    instructText () {
      return {
        NOT_READY: `
          Your pitch deck has been uploaded but you have not submitted it for
          review yet. Click the "Submit Pitch Deck For Review" button when your
          pitch deck is ready to be reviewed by StartUpNV's Reviewers.
        `,
        NEEDS_REWORK: `
          Your pitch deck has been reviewed by our reviewers, but has been sent
          back for re-work. Click the "See My Feedback" button to see the
          feedback left by our reviewers and update your pitch deck accordingly.
          When you think your pitch deck is ready to re-submit for review, click
          the 'Submit Pitch Deck For Review' button to re-initiate the review
          process.
        `,
        UNDER_REVIEW: `
          Your pitch deck has been submitted and is under review by StartUpNV's
          Reviewers. Once you have four or more reviews, the "See My Feedback"
          button will be enabled, allowing you to click it to see your recent
          reviews. Additionally, once you have over four reviews, an admin will
          either accept your pitch deck or send it back for re-work. Check back
          here periodically for updates.
        `,
        ACCEPTED: `
          Your pitch deck has been accepted by StartUpNV's Reviewers. You can
          click the "See My Feedback" button  to see your recent reviews. You
          may now select the "Book a Pitch Date" button to book a date to pitch
          your pitch deck with StartUpNV.
        `,
        REJECTED: `
          Your pitch deck has not been accepted by StartUpNV's Reviewers. You
          can click the "See My Feedback" button to see your recent reviews.
        `,
      }[this.pitchDeck.status];
    },
    reviewCount () {
      try {
        return this.pitchDeck.reviews.length;
      } catch {
        return 0;
      }
    },
    feedbackButtonDisabled () {
      return this.reviewCount < MIN_REVIEW_COUNT;
    },
    showReUploadPitchDeckButton () {
      const { status, isLocked } = this.pitchDeck;
      return !isLocked && (status === 'NOT_READY' || status === 'NEEDS_REWORK');
    },
    showSubmitForReviewButton () {
      const { status, isLocked } = this.pitchDeck;
      return !isLocked && status === 'NOT_READY';
    },
    showBookPitchDateButton () {
      const { status, isLocked } = this.pitchDeck;
      return !isLocked && status === 'ACCEPTED';
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
      submitPitchDeckForReview: `${PITCH_DECK}/${SUBMIT_PITCH_DECK_FOR_REVIEW}`,
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
    onReUploadPitchDeckButtonClick () {
      this.$refs['reupload-pitchdeck-modal'].show();
    },
    async onSubmitForReviewButtonClick () {
      const { pitchDeck } = await this.submitPitchDeckForReview();
      this.pitchDeck = pitchDeck;
    },
    async onBookPitchDateButtonClick () {
      await this.$router.push({ name: 'book-pitch-date' });
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
          v-if="showReUploadPitchDeckButton"
          type="button"
          class="right-flex btn btn-primary small-btn"
          @click="onReUploadPitchDeckButtonClick"
        >
          Re-upload Pitch Deck
        </button>
        <b-modal
          id="reUploadPitchDeckModal"
          ref="reupload-pitchdeck-modal"
          size="lg"
          centered
          :hide-footer="true"
          title="Re-upload Pitch Deck"
        >
          <ReUploadPitchDeckModal />
        </b-modal>
        <button
          v-if="showSubmitForReviewButton"
          type="button"
          class="right-flex btn btn-primary small-btn"
          @click="onSubmitForReviewButtonClick"
        >
          Submit Pitch Deck For Review
        </button>
        <button
          v-if="showBookPitchDateButton"
          type="button"
          class="right-flex btn btn-primary small-btn"
          @click="onBookPitchDateButtonClick"
        >
          Book a Pitch Date
        </button>
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
