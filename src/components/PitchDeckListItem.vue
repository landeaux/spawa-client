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
    {{ businessName }}
  </div>
</template>

<style scoped lang="sass">

</style>
