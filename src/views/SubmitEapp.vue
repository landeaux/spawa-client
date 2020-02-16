<script>
export default {
  name: 'BookPitchDate',
  components: {
    BaseHubSpotFormView: () => import('@/components/BaseHubSpotFormView'),
  },
  data: () => ({
    instructions: 'Please fill out the Entrepreneur Form below.',
    formBaseUrl: process.env.VUE_APP_HUBSPOT_EAPP_FORM_URL,
    prefillKeyMap: {
      email: 'email',
      user_id: 'id',
    },
    routerLinkTo: 'watch-pitch-video',
    successMessage: 'Thank you for submitting the form! Click "Next" to continue.',
    title: 'Submit Eapp',
  }),
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
  />
</template>
