<script>
import {
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DOWNLOAD_PITCH_DECK,
  GET_REVIEW_BY_ID,
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
const REVIEW = 'review';

/**
 * component statuses
 */
const INIT = 'INIT';
const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

const INIT_FORM = {
  isProblemStatementPresent: false,
  isSolutionDescriptionPresent: false,
  isMarketCompetitionPresent: false,
  isBusinessModelPresent: false,
  isTeamPresent: false,
  isAskPresent: false,
  isContactSlidePresent: false,
  problemStatementRating: 0,
  solutionDescriptionRating: 0,
  marketCompetitionRating: 0,
  businessModelRating: 0,
  teamRating: 0,
  askRating: 0,
  additionalComments: '',
  pitchReady: false,
};

/**
 * PitchDeckReviewForm
 *
 * The review form for reviewers to use to leave a review on a pitch deck.
 */
export default {
  name: 'PitchDeckReviewForm',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  props: {
    pitchDeck: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      status: INIT,
      form: { ...INIT_FORM },
      options: [
        { text: '0', value: 0, disabled: false },
        { text: '1', value: 1, disabled: false },
        { text: '2', value: 2, disabled: false },
        { text: '3', value: 3, disabled: false },
        { text: '4', value: 4, disabled: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      currentUser: `${AUTH}/currentUser`,
      reviewErrors: `${REVIEW}/reviewErrors`,
    }),
    errors () {
      return this.reviewErrors[0];
    },
    showForm () {
      return this.statusIsInit || this.statusIsError;
    },
    statusIsInit () {
      return this.status === INIT;
    },
    statusIsPending () {
      return this.status === PENDING;
    },
    statusIsSuccess () {
      return this.status === SUCCESS;
    },
    statusIsError () {
      return this.status === ERROR;
    },
    showDownloadButton () {
      return this.statusIsInit || this.statusIsError;
    },
    userHasReviewed () {
      return this.pitchDeck.userHasReviewed;
    },
  },
  async created () {
    // if the user has already reviewed this pitch deck
    if (this.pitchDeck.usersReview !== '') {
      // grab the user's review ...
      const { review } = await this.getReviewById(this.pitchDeck.usersReview);

      // ... and prefill the form with the existing review values
      Object.keys(this.form).forEach((key) => {
        // only fill the form fields which have matching keys with the review
        if (Object.prototype.hasOwnProperty.call(review, key)) {
          this.form[key] = review[key];
        }
      });
    }
  },
  methods: {
    ...mapActions({
      createReview: `${REVIEW}/${CREATE_REVIEW}`,
      updateReview: `${REVIEW}/${UPDATE_REVIEW}`,
      getReviewById: `${REVIEW}/${GET_REVIEW_BY_ID}`,
      downloadPitchDeck: `${PITCH_DECK}/${DOWNLOAD_PITCH_DECK}`,
    }),
    async onSubmit () {
      this.status = PENDING;
      const action = this.pitchDeck.userHasReviewed
        ? this.updateReview
        : this.createReview;
      const payload = {
        ...this.form,
        pitchDeck: this.pitchDeck.id,
        reviewerName: this.currentUser.username,
      };
      if (this.pitchDeck.usersReview !== '') {
        payload.id = this.pitchDeck.usersReview;
      }
      await action(payload);
      this.status = this.errors
        ? ERROR
        : SUCCESS;
      if (this.statusIsSuccess) {
        this.$emit('review-submit-success');
      }
    },
    onReset () {
      // Reset form state and reset our form values
      this.status = INIT;
      this.resetForm();
    },
    onDownloadButtonClick () {
      this.downloadPitchDeck({
        id: this.pitchDeck.id,
      });
    },
    resetForm () {
      this.form = { ...INIT_FORM };
    },
  },
};
</script>

<template>
  <div class="container">
    <div
      v-if="statusIsPending"
      class="loader-container"
    >
      <PulseLoader
        class="loader"
        color="blue"
        size="25px"
      />
    </div>
    <b-alert
      v-if="statusIsError"
      :show="true"
      variant="danger"
      class="alerts"
      fade
      dismissible
      dismiss-label="Close"
    >
      <div class="error-messages">
        <p>An error has occurred!</p>
        <ul>
          <li
            v-for="(v, k) in errors"
            :key="k"
          >
            <strong>{{ k }}</strong> {{ v }}
          </li>
        </ul>
      </div>
    </b-alert>
    <b-alert
      v-else-if="statusIsSuccess"
      :show="true"
      variant="success"
      class="alerts"
      fade
    >
      Review created successfully!
    </b-alert>
    <p
      v-if="showDownloadButton"
      class="instruct-text"
    >
      To download the pitch deck to review please select the button below labeled "Download Pitch Deck". This will
      download the pitch deck to either your set downloads folder for your browser or will open a prop to save the file.
      This saved file can then be opened either directly in your browser or in a program appropriate for the file type
      by clicking on the file in its download location.
    </p>
    <hr>
    <button
      v-if="showDownloadButton"
      type="button"
      class="btn btn-primary small-btn"
      @click="onDownloadButtonClick"
    >
      Download Pitch Deck
    </button>
    <b-form
      v-if="showForm"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
    >
      <div class="main-form">
        <hr>
        <p class="instruct-text">
          Are these topics covered? Check all that are present:
        </p>
        <hr>
        <b-form-group>
          <b-form-checkbox
            id="input-isProblemStatementPresent"
            v-model="form.isProblemStatementPresent"
            required
          >
            Problem Statement
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isSolutionDescriptionPresent"
            v-model="form.isSolutionDescriptionPresent"
            required
          >
            Solution With Description of Product or Service
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isMarketCompetitionPresent"
            v-model="form.isMarketCompetitionPresent"
            required
          >
            Market & Competition
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isBusinessModelPresent"
            v-model="form.isBusinessModelPresent"
            required
          >
            Business Model
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isTeamPresent"
            v-model="form.isTeamPresent"
            required
          >
            Team
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isAskPresent"
            v-model="form.isAskPresent"
            required
          >
            Ask
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isContactSlidePresent"
            v-model="form.isContactSlidePresent"
            required
          >
            Contact Slide
          </b-form-checkbox>
        </b-form-group>
        <hr>
        <p class="instruct-text">
          Please rate the topics for content, using 0 for missing or not addressed and 1 (low) - 4 (high) for quality:
        </p>
        <hr>
        <b-form-group label="Problem Statement Rating: ">
          <b-form-group label="(Vague and Rambling vs Clear and Concise)">
            <b-form-radio-group
              v-model="form.problemStatementRating"
              :options="options"
              class="mb-3"
              value-field="value"
              text-field="text"
              disabled-field="notEnabled"
              required
            />
          </b-form-group>
        </b-form-group>
        <b-form-group label="Solution Description Rating: ">
          <b-form-group label="(Vague and Hard to Understand vs Clear and Concise)">
            <b-form-radio-group
              v-model="form.solutionDescriptionRating"
              :options="options"
              class="mb-3"
              value-field="value"
              text-field="text"
              disabled-field="notEnabled"
              required
            />
          </b-form-group>
        </b-form-group>

        <b-form-group label="Market Competition Rating: ">
          <b-form-group label="(Not Addressed or Too Vague vs SOM Defined, Bottom Up Calculation with Competition Info)">
            <b-form-radio-group
              v-model="form.marketCompetitionRating"
              :options="options"
              class="mb-3"
              value-field="value"
              text-field="text"
              disabled-field="notEnabled"
              required
            />
          </b-form-group>
        </b-form-group>

        <b-form-group label="Business Model Rating: ">
          <b-form-group label="(Vague and Leaves Many Questions Unanswered vs Clear and Sensible)">
            <b-form-radio-group
              v-model="form.businessModelRating"
              :options="options"
              class="mb-3"
              value-field="value"
              text-field="text"
              disabled-field="notEnabled"
              required
            />
          </b-form-group>
        </b-form-group>

        <b-form-group label="Team Rating: ">
          <b-form-group label="(Multiple Slides and Too Much Information, Including Advisors vs 1 Slide and Concrete)">
            <b-form-radio-group
              v-model="form.teamRating"
              :options="options"
              class="mb-3"
              value-field="value"
              text-field="text"
              disabled-field="notEnabled"
              required
            />
          </b-form-group>
        </b-form-group>

        <b-form-group label="Ask Rating: ">
          <b-form-group label="(Unclear or Missing vs Clear and Brief)">
            <b-form-radio-group
              v-model="form.askRating"
              :options="options"
              class="mb-3"
              value-field="value"
              text-field="text"
              disabled-field="notEnabled"
              required
            />
          </b-form-group>
        </b-form-group>
        <hr>
        <p class="instruct-text">
          Please rate the deck for appearance and style. Is there too much text, more than one idea per slide, too many slides dedicated to one topic, words or spreadsheets where a graph will do the job more clearly? Does it appear that the business model is adequately explained?
        </p>
        <hr>
        <b-form-group
          id="input-group-additional-comments"
          label="Please enter additional advice on the deck's style, appearance and content:"
          label-for="input-additional-comments"
        >
          <b-form-input
            id="input-additional-comments"
            v-model="form.additionalComments"
            required
            placeholder="Your Response"
          />
        </b-form-group>
        <hr>
        <b-form-group label="Is this pitch ready to be scheduled?">
          <b-form-radio
            v-model="form.pitchReady"
            name="Yes"
            :value="true"
          >
            Yes
          </b-form-radio>
          <b-form-radio
            v-model="form.pitchReady"
            name="No"
            :value="false"
          >
            No
          </b-form-radio>
        </b-form-group>
      </div>
      <b-button
        type="submit"
        variant="primary"
        class="form-btn"
      >
        Submit
      </b-button>
      <b-button
        type="reset"
        variant="danger"
        class="form-btn"
      >
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<style scoped lang="sass">
  .main-form
    text-align: left
    color: #039
    .form-btn
      display: inline-flex
      flex-direction: row
      justify-content: space-evenly
      width: 10vw
      height: 2.5rem
      font-size: 16px
      margin: 10px
      font-weight: bold
    .alerts
      .error-messages, .success-messages
        padding-left: 2.5rem
      .error-messages
        ul
          margin: 0
          padding: 0
          li
            list-style: none
  .loader-container
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
  .instruct-text
    font-weight: bold
    color: #039
</style>
