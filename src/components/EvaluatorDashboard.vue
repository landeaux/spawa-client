<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('auth');

/**
 * EvaluatorDashboard
 *
 * The Evalutor Dashboard component.
 */
export default {
  name: 'EvaluatorDashboard',
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
};
</script>

<template>
  <div class="greeting">
    <h1>Evaluator Dashboard</h1>
    <p>Welcome back, {{ currentUser.username }}!</p>
  </div>
</template>

<style scoped>

</style>
