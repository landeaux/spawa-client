<script>
import BigButtonComponent from '@/components/BigButtonComponent';
export default {
  name: 'AdminDashboardMainVue',
  components: {
    BigButtonComponent,
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
  <div class="main-flex">
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
  .main-flex
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: center
    width: 70vw
  .btn-flex
    margin: 1%
</style>
