<script>
/**
 * AdminDashboardMain
 *
 * The Main Admin Dashboard view component.
 */
export default {
  name: 'AdminDashboardMain',
  components: {
    BigButtonComponent: () => import('@/components/BigButtonComponent'),
  },
  methods: {
    onPitchDeckListButtonClick () {
      this.$emit('pitch-list-btn-clicked');
    },
    onUserListButtonClick () {
      this.$emit('user-list-btn-clicked');
    },
    onCreateUserButtonClick () {
      this.$emit('create-user-btn-clicked');
    },
  },
};
</script>

<template>
  <div class="container">
    <BigButtonComponent
      title="Pitch Deck List"
      class="btn-flex"
      @click.native="onPitchDeckListButtonClick"
    />
    <BigButtonComponent
      title="User List"
      class="btn-flex"
      @click.native="onUserListButtonClick"
    />
    <BigButtonComponent
      title="Create User"
      class="btn-flex"
      @click.native="onCreateUserButtonClick"
    />
  </div>
</template>

<style scoped lang="sass">
  .btn-flex
    margin: 1%
</style>
