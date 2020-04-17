<script>
import { UPDATE_USER_STATE } from '@/store/actions.type';

export default {
  name: 'BookPitchDate',
  components: {
    BaseHubSpotFormView: () => import('@/components/BaseHubSpotFormView'),
  },
  data: () => ({
    instructions: 'Please fill out and submit the form below.',
    formBaseUrl: process.env.VUE_APP_HUBSPOT_EAPP_FORM_URL,
    prefillKeyMap: {
      email: 'email',
      user_id: 'id',
    },
    routerLinkTo: 'watch-pitch-video',
    successMessage: 'Thank you for submitting the form! Click "Next" to continue.',
    title: 'Entrepreneur Information Form',
  }),
  methods: {
    onNextButtonClick () {
      this.$store.dispatch(UPDATE_USER_STATE, {
        state: 'watch_pitch_video',
      });
    },
  },
};
</script>

<template>
  <BaseHubSpotFormView
    id="view"
    :form-base-url="formBaseUrl"
    :instructions="instructions"
    :prefill-key-map="prefillKeyMap"
    :router-link-to="routerLinkTo"
    :success-message="successMessage"
    :title="title"
    @next-button-click="onNextButtonClick"
  />
</template>
