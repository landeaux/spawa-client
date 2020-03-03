<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ReviewerDashboard',
  components: {
    PitchDeckList: () => import('@/components/PitchDeckList'),
  },
  data: () => ({
    pitchDecks: [
      {
        businessName: 'Burger King',
        dateSubmitted: new Date(),
        userHasReviewed: false,
        reviewCount: 0,
      },
      {
        businessName: 'McDonald\'s',
        dateSubmitted: new Date('02/28/2020'),
        userHasReviewed: true,
        reviewCount: 1,
      },
      {
        businessName: 'Wendy\'s',
        dateSubmitted: new Date('09/09/2009'),
        userHasReviewed: true,
        reviewCount: 4,
      },
    ],
  }),
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div id="view">
    <h1>Reviewer Dashboard</h1>
    <p>Welcome back, {{ currentUser.username }}!</p>
    <PitchDeckList
      :items="pitchDecks"
      class="pitch-deck-list"
    />
  </div>
</template>

<style scoped lang="sass">
.pitch-deck-list
  min-width: 50%

@media screen and (max-width: 1024px)
  .pitch-deck-list
    width: 90%
    min-width: 520px

</style>
