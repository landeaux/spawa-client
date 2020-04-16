<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ReviewerDashboard',
  components: {
    PitchDeckList: () => import('@/components/PitchDeckListV2'),
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div class="container">
    <div class="greeting">
      <h1>Reviewer Dashboard</h1>
      <p>Welcome back, {{ currentUser.username }}!</p>
    </div>
    <PitchDeckList />
  </div>
</template>

<style scoped lang="sass">
  h1
    color: #039
  p
    color: #007bff
  .active-crumb
    color: #039
  .inactive-crumb
    color: #007bff
  .dashboard-actions
    display: flex
    flex-direction: row
</style>
