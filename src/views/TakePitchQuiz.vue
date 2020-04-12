<script>
import { UPDATE_USER_STATE } from '@/store/actions.type';

/**
 * TakePitchQuiz
 */
export default {
  name: 'TakePitchQuiz',
  components: {
    BaseHubSpotFormView: () => import('@/components/BaseHubSpotFormView'),
  },
  data: () => ({
    instructions: 'Please complete the pitch quiz below.',
    formBaseUrl: process.env.VUE_APP_HUBSPOT_PITCH_QUIZ_FORM_URL,
    prefillKeyMap: {
      email: 'email',
    },
    routerLinkTo: 'submit-pitch-deck',
    successMessage: 'Thank you for taking the quiz! Click "Next" to continue.',
    title: 'Take Pitch Quiz',
  }),
  methods: {
    onNextButtonClick () {
      this.$store.dispatch(UPDATE_USER_STATE, {
        state: 'submit_pitch_deck',
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
