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
  data () {
    return {
      currentStatus: null,
      uploadError: null,
      uploadFieldName: 'pitchdeck',
      fileBlob: null,
      fileName: '',
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
      console.log(evt);
      console.log(evt.target);
      const formData = new FormData();
      if (!this.fileBlob || this.fileName === '') return;
      formData.append(this.uploadFieldName, this.fileBlob, this.fileName);
      this.uploadFile(formData);
    },
  },
};
</script>

<template>
  <div class="container">
    <!--UPLOAD-->
    <form
      v-if="isInitial || isSaving"
      enctype="multipart/form-data"
      novalidate
      @submit.prevent="onFormSubmit"
    >
      <h1>Upload Pitch Deck</h1>
      <div class="dropbox">
        <label
          v-if="isInitial"
          :for="uploadFieldName"
        >
          Select your file
          <input
            type="file"
            :name="uploadFieldName"
            :disabled="isSaving"
            accept="application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation"
            class="input-file"
            @change="onFileInputChange"
          >
        </label>
        <p v-if="isSaving">
          Uploading file...
        </p>
      </div>
      <input
        type="submit"
        value="Submit"
      >
    </form>
    <!--SUCCESS-->
    <div v-if="isSuccess">
      <h2>Uploaded file successfully.</h2>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
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
  label
    display: block
    text-align: center
    input
      margin: auto
      display: block
</style>
