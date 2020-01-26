<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminDashboard',
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div class="greeting">
    <h1>Admin Dashboard</h1>
    <p>Welcome back, {{ currentUser.username }}!</p>
  </div>
</template>

<style scoped>

</style>
