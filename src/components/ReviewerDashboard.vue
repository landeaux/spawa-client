<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ReviewerDashboard',
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div class="greeting">
    <h1>Reviewer Dashboard</h1>
    <p>Welcome back, {{ currentUser.username }}!</p>
  </div>
</template>

<style scoped>

</style>
