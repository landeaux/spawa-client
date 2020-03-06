<script>
import AdminDashboardUserListItem from '@/components/AdminDashboardUserListItem';

export default {
  name: 'AdminDashboardUserList',
  components: {
    AdminDashboardUserListItem,
  },
};
</script>

<template>
  <div id="view">
    <AdminDashboardUserListItem
      active="true"
      username="John"
      created="Tue 01 12 2017"
      class="bot-margin"
    />
    <AdminDashboardUserListItem
      active="false"
      username="Bob"
      created="Mon 07 3 2016"
      class="bot-margin"
    />
    <AdminDashboardUserListItem
      active="true"
      username="Tyler"
      created="Sun 01 5 2015"
      class="bot-margin"
    />
  </div>
</template>

<style scoped lang = sass>
  .bot-margin
    margin-bottom: 8px
</style>
