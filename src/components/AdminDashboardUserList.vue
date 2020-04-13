<script>
import AdminDashboardUserListItem from '@/components/AdminDashboardUserListItem';
import { FETCH_USERS } from '@/store/actions.type';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { mapGetters } from 'vuex';

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
    ...mapGetters([
      'userErrors',
    ]),
    showError () {
      return this.userErrors.length > 0;
    },
    showLoader () {
      return this.state === 'INIT';
    },
  },
  async created () {
    const response = await this.$store.dispatch(FETCH_USERS);
    if (!this.isError(response)) {
      this.userList = response.users;
    }
    this.state = 'FETCH_COMPLETE';
  },
  methods: {
    isError (obj) {
      return (obj && obj.stack && obj.message);
    },
  },
};
</script>

<template>
  <div id="view">
    <PulseLoader
      v-if="showLoader"
      class="loader"
      color="blue"
      size="25px"
    />
    <div
      v-else-if="showError"
    >
      There was an error fetching the user list.
    </div>
    <div v-else>
      <AdminDashboardUserListItem
        v-for="userItem in userList"
        :key="userItem.username"
        :user="userItem"
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
