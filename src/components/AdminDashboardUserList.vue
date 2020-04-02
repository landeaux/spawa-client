<script>
import AdminDashboardUserListItem from '@/components/AdminDashboardUserListItem';
import { FETCH_USERS } from '@/store/actions.type';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'AdminDashboardUserList',
  components: {
    AdminDashboardUserListItem,
    PulseLoader,
  },
  data: () => ({
    state: 'INIT',
    userList: [],
  }),
  computed: {
    fetchError () {
      return (this.userList.length === 0);
    },
  },
  async created () {
    this.userList = await this.$store.dispatch(FETCH_USERS);
    this.state = 'FETCH_COMPLETE';
  },
};
</script>

<template>
  <div id="view">
    <PulseLoader
      v-if="state === 'INIT'"
      class="loader"
      color="blue"
      size="25px"
    />
    <div
      v-else-if="fetchError"
    >
      There was an error fetching the user list.
    </div>
    <div v-else>
      <AdminDashboardUserListItem
        v-for="userItem in userList.users"
        :key="userItem.username"
        :active="userItem.active"
        :username="userItem.username"
        :created="userItem.createdAt"
        class="bot-margin"
      />
    </div>
  </div>
</template>

<style scoped lang = sass>
  .bot-margin
    margin-bottom: 8px
</style>
