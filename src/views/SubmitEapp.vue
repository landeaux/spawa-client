<script>
export default {
  name: 'BookPitchDate',
  components: {
    BaseHubSpotFormView: () => import('@/components/BaseHubSpotFormView'),
  },
  data: () => ({
    description: 'Please fill out the Entrepreneur Form below:',
    formBaseUrl: process.env.VUE_APP_HUBSPOT_EAPP_FORM_URL,
    prefillKeyMap: {
      email: 'email',
      user_id: 'id',
    },
    routerLinkTo: 'home',
    title: 'Submit Eapp',
  }),
};
</script>

<template>
  <BaseHubSpotFormView
    :description="description"
    :form-base-url="formBaseUrl"
    :prefill-key-map="prefillKeyMap"
    :router-link-to="routerLinkTo"
    :title="title"
  />
</template>
