<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EvaluatorDashboard',
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div class="greeting">
    <h1>Evaluator Dashboard</h1>
    <p>Welcome back, {{ currentUser }}!</p>
  </div>
</template>

<style scoped>

</style>
