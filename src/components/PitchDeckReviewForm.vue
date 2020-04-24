<script>
import { CREATE_REVIEW, DOWNLOAD_PITCH_DECK } from '@/store/actions.type';
import {
  mapActions,
  mapGetters,
} from 'vuex';

const AUTH = 'auth';
const PITCH_DECK = 'pitchDeck';
const USER = 'user';

export default {
  name: 'PitchDeckReviewForm',
  props: {
    user: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      form: {
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
      },
      options: [
        { text: '1', value: 0, disabled: false },
        { text: '2', value: 1, disabled: false },
        { text: '3', value: 2, disabled: false },
        { text: '4', value: 3, disabled: false },
        { text: '5', value: 4, disabled: false },
      ],
      show: true,
      showErrorAlert: false,
      showSuccessAlert: false,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: `${AUTH}/currentUser`,
      userErrors: `${USER}/userErrors`,
      pitchDeckErrors: `${PITCH_DECK}/pitchDeckErrors`,
      pitchDeckList: `${PITCH_DECK}/pitchDeckList`,
    }),
    errors () {
      return this.userErrors[0];
    },
  },
  methods: {
    ...mapActions({
      createReview: CREATE_REVIEW,
      downloadPitchDeck: DOWNLOAD_PITCH_DECK,
    }),
    async onSubmit (evt) {
      Object.keys(this.userErrors).forEach(k => delete this.userErrors[k]);
      evt.preventDefault();
      await this.createReview({
        owner: this.user,
        pitchDeck: this.user.pitchDeck,
        reviewerName: this.currentUser,
        isProblemStatementPresent: this.isProblemStatementPresent,
        isSolutionDescriptionPresent: this.isSolutionDescriptionPresent,
        isMarketCompetitionPresent: this.isMarketCompetitionPresent,
        isBusinessModelPresent: this.isBusinessModelPresent,
        isTeamPresent: this.isTeamPresent,
        isAskPresent: this.isAskPresent,
        isContactSlidePresent: this.isContactSlidePresent,
        problemStatementRating: this.problemStatementRating,
        solutionDescriptionRating: this.solutionDescriptionRating,
        marketCompetitionRating: this.marketCompetitionRating,
        businessModelRating: this.businessModelRating,
        teamRating: this.teamRating,
        askRating: this.askRating,
        additionalComments: this.additionalComments,
        pitchReady: this.pitchReady,
      });
      this.determineAlert();
      this.onReset(evt);
    },
    onReset (evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.isProblemStatementPresent = false;
      this.form.isSolutionDescriptionPresent = false;
      this.form.isMarketCompetitionPresent = false;
      this.form.isBusinessModelPresent = false;
      this.form.isTeamPresent = false;
      this.form.isAskPresent = false;
      this.form.isContactSlidePresent = false;
      this.form.problemStatementRating = 0;
      this.form.solutionDescriptionRating = 0;
      this.form.marketCompetitionRating = 0;
      this.form.businessModelRating = 0;
      this.form.teamRating = 0;
      this.form.askRating = 0;
      this.form.additionalComments = '';
      this.form.pitchReady = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    determineAlert () {
      this.showErrorAlert = false;
      this.showSuccessAlert = false;
      if (Object.keys(this.userErrors).length !== 0) {
        this.showErrorAlert = true;
      } else if (Object.keys(this.userErrors).length === 0 && this.createdUsername !== '') {
        this.showSuccessAlert = true;
      }
    },
    onDownloadButtonClick () {
      this.downloadPitchDeck({
        id: this.user.pitchDeck,
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <b-alert
      v-model="showErrorAlert"
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
      v-model="showSuccessAlert"
      variant="success"
      class="alerts"
      dismissible
      fade
    >
      <div class="success-messages">
        Review Created For:
        <router-link
          class="nav-link"
          active-class="active"
          :to="{
            name: 'profile',
            params: { username: user.username }
          }"
        >
          {{ user.username }}
        </router-link>
      </div>
    </b-alert>
    <button
      type="button"
      class="right-flex btn btn-primary small-btn"
      @click="onDownloadButtonClick"
    >
      Download Pitch Deck
    </button>
    <b-form
      v-if="show"
      @submit="onSubmit"
      @reset="onReset"
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
</style>
