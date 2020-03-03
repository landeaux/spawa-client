<script>
import PitchDeckListItem from '@/components/PitchDeckListItem';

/**
 * PitchDeckList
 */
export default {
  name: 'PitchDeckList',
  components: {
    PitchDeckListItem, // : () => import('@/components/PitchDeckListItem'),
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
</template>

<style scoped lang="sass">
.list-group
  .list-group-item
    &:hover
      background-color: #e4f7ff
</style>
