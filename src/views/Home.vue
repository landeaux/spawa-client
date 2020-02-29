<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    AdminDashboard: () => import('@/components/AdminDashboard'),
    EvaluatorDashboard: () => import('@/components/EvaluatorDashboard'),
    FounderDashboard: () => import('@/components/FounderDashboard'),
    ReviewerDashboard: () => import('@/components/ReviewerDashboard'),
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div id="view">
    <AdminDashboard v-if="currentUser.role === 'admin'" />
    <EvaluatorDashboard v-else-if="currentUser.role === 'evaluator'" />
    <ReviewerDashboard v-else-if="currentUser.role === 'reviewer'" />
    <FounderDashboard v-else-if="currentUser.role === 'founder'" />
  </div>
</template>
