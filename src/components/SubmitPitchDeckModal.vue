<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import {
  CREATE_PITCH_DECK,
  UPDATE_USER_STATE,
} from '@/store/actions.type';

/**
 * vuex module names
 */
const PITCH_DECK = 'pitchDeck';
const AUTH = 'auth';

/**
 * component states
 */
const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

/**
 * SubmitPitchDeck
 */
export default {
  name: 'SubmitPitchDeck',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data () {
    return {
      currentStatus: STATUS_INITIAL,
      uploadError: null,
      uploadFieldName: 'pitchdeck',
      file: null,
      fileName: '',
      instructions: 'Please submit your pitch deck using the form below.',
      title: 'Submit Pitch Deck',
      routerLinkTo: 'home',
      successMessage: 'Thank you for submitting your pitch deck!',
      inputHelp: 'We prefer PowerPoint, but you may submit .pdf',
    };
  },
  computed: {
    ...mapGetters({
      pitchDeck: 'pitchDeck/pitchDeck',
    }),
    inputValid () {
      return this.file !== null;
    },
    isInitial () {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  mounted () {
    this.reset();
  },
  methods: {
    ...mapActions({
      createPitchDeck: `${PITCH_DECK}/${CREATE_PITCH_DECK}`,
      updateUserState: `${AUTH}/${UPDATE_USER_STATE}`,
    }),
    /**
     * Reset form to initial state
     */
    reset () {
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
      this.file = null;
    },
    /**
     * Upload file to server
     * @param formData The form data to send to server
     */
    async uploadFile (formData) {
      this.currentStatus = STATUS_SAVING;
      try {
        await this.createPitchDeck(formData);
        this.currentStatus = STATUS_SUCCESS;
      } catch (err) {
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      }
    },
    /**
     * Handle form submission
     * @param evt The event object
     */
    onFormSubmit (evt) {
      if (!this.file) return;
      const formData = new FormData();
      formData.append(this.uploadFieldName, this.file, this.file.name);
      this.uploadFile(formData);
    },
    onNextButtonClick () {
      this.updateUserState({
        state: 'pitch_deck_review',
      });
    },
  },
};
</script>

<template>
  <div id="view">
    <h1>{{ title }}</h1>
    <p>{{ instructions }}</p>

    <div
      v-if="isInitial"
      class="form-container"
    >
      <b-form
        id="upload-form"
        enctype="multipart/form-data"
        @submit.prevent="onFormSubmit"
      >
        <fieldset>
          <fieldset class="form-group">
            <label
              :for="uploadFieldName"
              class="col-form-label col-form-label-lg"
            >
              Submit your pitch deck here
            </label>
            <p class="text-muted">
              {{ inputHelp }}
            </p>
            <b-form-file
              v-model="file"
              :name="uploadFieldName"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation"
              required
              :state="inputValid"
              autofocus
              size="lg"
              placeholder="Choose a file..."
              drop-placeholder="Drop your file here..."
              style="text-align: left"
            />
          </fieldset>
          <input
            type="submit"
            :disabled="!inputValid"
            value="Submit"
            class="btn btn-lg btn-primary"
          >
        </fieldset>
      </b-form>
    </div>

    <div
      v-if="isSaving"
      class="message"
    >
      <p>
        Uploading file
      </p>
      <PulseLoader
        class="loader"
        color="#007bff"
        size="25px"
      />
    </div>

    <div
      v-if="isSuccess"
      class="message"
    >
      <p>{{ successMessage }}</p>
    </div>

    <div
      v-if="isFailed"
      class="message"
    >
      <p>
        Uploaded failed.
        <a
          href="javascript:void(0)"
          @click="reset()"
        >
          Try again
        </a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<style lang="sass">
  @import '../assets/sass/vars'
  #view
    display: flex
    flex-direction: column
    .message, .form-container
      position: relative
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
    form
      fieldset
        &.form-group
          label
            font-weight: bold
          input
            &:hover
              cursor: pointer
    h1
      color: #039
    p
      color: #007bff
    .next-button
      min-width: 30vw
</style>
