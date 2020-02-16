<script>
/**
 * SubmitPitchDeck
 */
export default {
  name: 'SubmitPitchDeck',
  components: {
    BaseHubSpotFormView: () => import('@/components/BaseHubSpotFormView'),
  },
  data: () => ({
    instructions: 'Please submit your pitch deck using the form below.',
    formBaseUrl: process.env.VUE_APP_HUBSPOT_PITCH_DECK_SUBMISSION_FORM_URL,
    prefillKeyMap: {
      email: 'email',
    },
    routerLinkTo: 'home',
    successMessage: 'Thank you for submitting your pitch deck! Click "Next" to continue.',
    title: 'Submit Pitch Deck',
  }),
};
</script>

<template>
  <BaseHubSpotFormView
    :form-base-url="formBaseUrl"
    :instructions="instructions"
    :prefill-key-map="prefillKeyMap"
    :router-link-to="routerLinkTo"
    :success-message="successMessage"
    :title="title"
  />
</template>
