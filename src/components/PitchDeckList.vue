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
  <div>
    <PitchDeckListItem
      v-for="(item, index) in items"
      :key="index"
      :business-name="item.businessName"
      :date-submitted="item.dateSubmitted"
      :review-count="item.reviewCount"
      :user-has-reviewed="item.userHasReviewed"
    />
  </div>
</template>

<style scoped lang="sass">

</style>
