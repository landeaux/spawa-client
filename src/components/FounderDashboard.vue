<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FounderDashboard',
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div id="view">
    <div class="greeting">
      <h1>Founder Dashboard</h1>
      <p>Welcome back, {{ currentUser.username }}!</p>
    </div>
    <router-link
      class="nav-link"
      :to="{ name: 'book-pitch-date' }"
    >
      <button
        type="button"
        class="btn btn-primary"
      >
        Book a Pitch Date
      </button>
    </router-link>
  </div>
</template>

<style scoped>

</style>
