<script>
/**
 * @displayName PitchDeckListItem
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
      required: true,
      default: false,
    },
    reviewCount: {
      type: Number,
      required: true,
      default: 0,
      validator: function (value) {
        return Number.isInteger(value) && value >= 0;
      },
    },
  },
  data: () => ({}),
  computed: {
    icon () {
      return this.userHasReviewed
        ? 'check-circle'
        : 'alert-circle';
    },
    iconVariant () {
      return this.userHasReviewed
        ? 'success'
        : 'warning';
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
  <div class="item-wrapper">
    <div class="icon">
      <b-icon
        :icon="icon"
        :font-scale="2"
        :variant="iconVariant"
      />
    </div>
    <div class="info">
      <div class="business-name">
        {{ businessName }}
      </div>
      <div class="date-submitted">
        <strong>Submitted</strong> {{ dateSubmitted.toDateString() }}
      </div>
      <div class="review-count">
        {{ reviewCount }} reviews
      </div>
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
.item-wrapper
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
  padding: 5px
  .icon
    flex-basis: 34px
    flex-shrink: 0
  .info
    display: flex
    flex-direction: row
    flex-grow: 1
    align-items: center
    justify-content: stretch
    .business-name
      padding-left: 10px
      flex-basis: 50%
      text-align: left
      min-width: 0
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden
    .date-submitted, .review-count
      font-size: 0.8rem
    .date-submitted
      flex-basis: 35%
    .review-count
      flex-basis: 15%
  .action-btns
    flex-basis: 50px
    flex-shrink: 0
</style>
