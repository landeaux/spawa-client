<script>
import { mapGetters } from 'vuex';
import AdminDashboard from '@/components/AdminDashboard';
import EvaluatorDashboard from '@/components/EvaluatorDashboard';
import FounderDashboard from '@/components/FounderDashboard';
import ReviewerDashboard from '@/components/ReviewerDashboard';

export default {
  name: 'Home',
  components: { EvaluatorDashboard, FounderDashboard, ReviewerDashboard, AdminDashboard },
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
