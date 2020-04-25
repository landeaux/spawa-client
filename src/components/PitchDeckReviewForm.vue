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
        pitchDeck: this.pitchDeck._id,
        reviewerName: this.currentUser.username,
      };
      if (this.usersReview !== '') {
        payload.id = this.usersReview;
      }
      await action(payload);
      this.status = this.errors
        ? ERROR
        : SUCCESS;
      if (this.statusIsSuccess) {
        this.$emit('review-submit-success');
      }
      this.resetForm();
    },
    onReset () {
      // Reset form state and reset our form values
      this.status = INIT;
      this.resetForm();
    },
    onDownloadButtonClick () {
      this.downloadPitchDeck({
        id: this.pitchDeck._id,
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
      show="true"
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
      show="true"
      variant="success"
      class="alerts"
      dismissible
      fade
    >
      Review created successfully!
    </b-alert>
    <button
      v-if="showDownloadButton"
      type="button"
      class="right-flex btn btn-primary small-btn"
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
        <b-form-group>
          <b-form-checkbox
            id="input-isProblemStatementPresent"
            v-model="form.isProblemStatementPresent"
            required
          >
            Is Problem Statement Present?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isSolutionDescriptionPresent"
            v-model="form.isSolutionDescriptionPresent"
            required
          >
            Is Solution Description Present?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isMarketCompetitionPresent"
            v-model="form.isMarketCompetitionPresent"
            required
          >
            Is Market Competition Present?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isBusinessModelPresent"
            v-model="form.isBusinessModelPresent"
            required
          >
            Is Business Model Present?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isTeamPresent"
            v-model="form.isTeamPresent"
            required
          >
            Is Team Present?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isAskPresent"
            v-model="form.isAskPresent"
            required
          >
            Is Ask Present?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-isContactSlidePresent"
            v-model="form.isContactSlidePresent"
            required
          >
            Is Contact Slide Present?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="Problem Statement Rating: ">
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
        <b-form-group label="Solution Description Rating: ">
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
        <b-form-group label="Market Competition Rating: ">
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
        <b-form-group label="Business Model Rating: ">
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
        <b-form-group label="Team Rating: ">
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
        <b-form-group label="Ask Rating: ">
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
        <b-form-group
          id="input-group-additional-comments"
          label="Additional Comments:"
          label-for="input-additional-comments"
        >
          <b-form-input
            id="input-additional-comments"
            v-model="form.additionalComments"
            required
            placeholder="Enter Additional Comments"
          />
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="input-pitchReady"
            v-model="form.pitchReady"
            required
          >
            Is Deck Pitch Ready?
          </b-form-checkbox>
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

<style scoped lang = sass>
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
</style>
