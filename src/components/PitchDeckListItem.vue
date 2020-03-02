<script>
/**
 * @displayName PitchDeckListItem.vue
 */
export default {
  name: 'PitchDeckListItemVue',
  components: {},
  props: {
    businessName: {
      type: String,
      required: true,
      default: '',
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

<template>
  <div>
    <div class="icon"></div>
    <div class="business-name">
      {{ businessName }}
    </div>
    <div class="date-submitted"></div>
    <div class="action-btns"></div>
  </div>
</template>

<style scoped lang="sass">
div
  display: flex
  flex-direction: row
</style>
