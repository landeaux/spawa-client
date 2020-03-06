<script>
import BigButtonComponent from '@/components/BigButtonComponent';
export default {
  name: 'AdminDashboardMainVue',
  components: {
    BigButtonComponent,
  },
  methods: {
    emitPList () {
      this.$emit('pitch-list');
    },
    emitUList () {
      this.$emit('user-list');
    },
    emitUCreate () {
      this.$emit('create-user');
    },
  },
};
</script>

<template>
  <div class="main-flex">
    <BigButtonComponent
      title="Pitch Deck List"
      class="btn-flex"
      @click.native="emitPList"
    />
    <BigButtonComponent
      title="User List"
      class="btn-flex"
      @click.native="emitUList"
    />
    <BigButtonComponent
      title="Create User"
      class="btn-flex"
      @click.native="emitUCreate"
    />
  </div>
</template>

<style scoped lang="sass">
  .main-flex
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: center
    width: 70vw
  .btn-flex
    margin: 1%
</style>
