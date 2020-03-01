<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    AdminDashboard: () => import('@/components/AdminDashboard'),
    EvaluatorDashboard: () => import('@/components/EvaluatorDashboard'),
    FounderDashboard: () => import('@/components/FounderDashboard'),
    ReviewerDashboard: () => import('@/components/ReviewerDashboard'),
    Loader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  computed: {
    ...mapGetters(['currentUser']),
    dashboardComponent () {
      const componentKey = this.currentUser && this.currentUser.role
        ? this.currentUser.role
        : 'loader';
      // const componentKey = 'loader';
      return {
        admin: 'AdminDashboard',
        evaluator: 'EvaluatorDashboard',
        founder: 'FounderDashboard',
        reviewer: 'ReviewerDashboard',
        loader: 'Loader',
      }[componentKey];
    },
    dashboardComponentProps () {
      return this.currentUser && this.currentUser.role
        ? {}
        : {
          color: 'blue',
          size: '25px',
        };
    },
    dashboardComponentClasses () {
      return this.dashboardComponent === 'Loader'
        ? 'loader'
        : 'component';
    },
  },
};
</script>

<template>
  <div id="view">
    <component
      :is="dashboardComponent"
      v-bind="dashboardComponentProps"
      :class="dashboardComponentClasses"
    />
  </div>
</template>

<style scoped lang="sass">
@import '../assets/sass/vars'
#view
  .loader
    position: relative
    height: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
  .component
    flex-basis: 100%
</style>
