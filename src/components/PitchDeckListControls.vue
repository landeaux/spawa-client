<script>
/**
 * PitchDeckListControls
 */
export default {
  name: 'PitchDeckListControls',
  props: {
    pitchDeckCount: {
      default: 0,
      required: false,
      type: Number,
      validator: Number.isInteger,
    },
    unreviewedCount: {
      default: 0,
      required: false,
      type: Number,
      validator: Number.isInteger,
    },
  },
};
</script>

<template>
  <div class="controls-container border">
    <div class="info-wrapper">
      <div class="pitch-deck-count">
        {{ pitchDeckCount }} Total Pitch Decks
      </div>
      <div class="unreviewed-count">
        {{ unreviewedCount }} Unreviewed
      </div>
    </div>
    <div class="dropdown-group">
      <div class="filter-wrapper">
        <b-dropdown
          id="dropdown-filter"
          text="Filter By"
          class="m-md-2"
        >
          <b-dropdown-item>First Filter</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="sort-wrapper">
        <b-dropdown
          id="dropdown-sort"
          text="Sort By"
          class="m-md-2"
        >
          <b-dropdown-item>First Sort</b-dropdown-item>
        </b-dropdown>
      </div>
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
  .info-wrapper
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: center
    padding-left: 7px
  .dropdown-group
    display: flex
    align-items: center
    justify-content: center
</style>
