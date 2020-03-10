<script>
/**
 * PitchDeckListControls
 */
export default {
  name: 'PitchDeckListControls',
  props: {},
};
</script>

<template>
  <div class="controls-container border">
    <div class="filter-wrapper">
      <b-dropdown
        id="dropdown-filter"
        text="Filter"
        class="m-md-2"
      >
        <b-dropdown-item>First Filter</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="sort-wrapper">
      <b-dropdown
        id="dropdown-sort"
        text="Sort"
        class="m-md-2"
      >
        <b-dropdown-item>First Sort</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<style scoped lang="sass">
.controls-container
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-between
  background-color: #e4f7ff
</style>
