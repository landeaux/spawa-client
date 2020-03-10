<script>
import PitchDeckListItem from '@/components/PitchDeckListItem';
import PitchDeckListControls from '@/components/PitchDeckListControls';

/**
 * PitchDeckList
 */
export default {
  name: 'PitchDeckList',
  components: {
    PitchDeckListItem,
    PitchDeckListControls,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<template>
  <div class="list-container">
    <div>
      <PitchDeckListControls />
    </div>
    <div class="list-group">
      <PitchDeckListItem
        v-for="(item, index) in items"
        :key="index"
        :business-name="item.businessName"
        :date-submitted="item.dateSubmitted"
        :review-count="item.reviewCount"
        :user-has-reviewed="item.userHasReviewed"
        class="list-group-item"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
.list-container
  display: flex
  flex-direction: column
  .list-group
    .list-group-item
      &:hover
        background-color: #e4f7ff
</style>
