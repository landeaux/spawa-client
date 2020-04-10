<script>
import { CREATE_PITCH_DECK } from '@/store/actions.type';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

/**
 * SubmitPitchDeckV2
 */
export default {
  name: 'SubmitPitchDeckV2',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data () {
    return {
      currentStatus: null,
      uploadError: null,
      uploadFieldName: 'pitchdeck',
      fileBlob: null,
      fileName: '',
      instructions: 'Please submit your pitch deck using the form below.',
      title: 'Submit Pitch Deck',
      routerLinkTo: 'home',
      successMessage: 'Thank you for submitting your pitch deck! Click "Next" to continue.',
      inputHelp: 'We prefer PowerPoint, but you may submit .pdf',
    };
  },
  computed: {
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
    /**
     * Reset form to initial state
     */
    reset () {
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
      this.fileBlob = null;
      this.fileName = '';
    },
    /**
     * Upload file to server
     * @param formData The form data to send to server
     */
    async uploadFile (formData) {
      this.currentStatus = STATUS_SAVING;
      try {
        const data = await this.$store.dispatch(CREATE_PITCH_DECK, formData);
        this.currentStatus = STATUS_SUCCESS;
        console.log(data);
      } catch (err) {
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      }
    },
    /**
     * Stage data according to selected file
     * @param evt The event object
     */
    onFileInputChange (evt) {
      const files = evt.target.files;
      if (!files.length) return;
      this.fileBlob = files[0];
      this.fileName = files[0].name;
    },
    /**
     * Handle form submission
     * @param evt The event object
     */
    onFormSubmit (evt) {
      const formData = new FormData();
      if (!this.fileBlob || this.fileName === '') return;
      formData.append(this.uploadFieldName, this.fileBlob, this.fileName);
      this.uploadFile(formData);
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
      class="form"
    >
      <form
        enctype="multipart/form-data"
        novalidate
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
            <input
              type="file"
              :name="uploadFieldName"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation"
              required
              class="form-control form-control-lg"
              @change="onFileInputChange"
            >
          </fieldset>
          <input
            type="submit"
            value="Submit"
            class="btn btn-lg btn-primary"
          >
        </fieldset>
      </form>
    </div>

    <div
      v-if="isSaving"
      class="message"
    >
      <p>
        Uploading file...
      </p>
      <PulseLoader
        class="loader"
        color="blue"
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

    <router-link
      v-if="isSuccess"
      :to="{ name: routerLinkTo }"
    >
      <button
        type="button"
        class="btn btn-primary next-button"
      >
        Next
      </button>
    </router-link>
    <button
      v-else
      type="button"
      class="btn btn-primary next-button"
      style="cursor: not-allowed"
      disabled
      title="Please fill out the form to continue."
    >
      Please Fill Out The Form To Continue
    </button>
  </div>
</template>

<style lang="sass">
  @import '../assets/sass/vars'
  #view
    display: flex
    flex-direction: column
    .message, .form
      position: relative
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
    .form
      fieldset
        &.form-group
          label
            font-weight: bold
    h1
      color: #039
    p
      color: #007bff
    button
     min-width: 30vw
</style>
