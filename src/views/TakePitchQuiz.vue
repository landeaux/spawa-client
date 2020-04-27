<script>
import { UPDATE_USER_STATE } from '@/store/actions.type';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

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
    ...mapActions({
      updateUserState: UPDATE_USER_STATE,
    }),
    onNextButtonClick () {
      this.updateUserState({
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
