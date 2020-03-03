<script>
/**
 * @displayName PitchDeckListItem.vue
 */
export default {
  name: 'PitchDeckListItem',
  props: {
    businessName: {
      type: String,
      required: true,
      default: '',
    },
    dateSubmitted: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    userHasReviewed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    icon () {
      return this.userHasReviewed
        ? 'check-circle'
        : 'alert-circle';
    },
  },
  methods: {
    onReviewButtonClick () {
      this.$emit('review-button-clicked');
    },
  },
};
</script>

<template>
  <div>
    <div class="icon">
      <b-icon :icon="icon" />
    </div>
    <div class="business-name">
      {{ businessName }}
    </div>
    <div class="date-submitted">
      {{ dateSubmitted.toDateString() }}
    </div>
    <div class="action-btns">
      <button
        class="btn btn-primary"
        @click="onReviewButtonClick"
      >
        Review
      </button>
    </div>
  </div>
</template>

<style scoped lang="sass">
div
  display: flex
  flex-direction: row
</style>
