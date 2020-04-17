<script>
import { mapGetters } from 'vuex';
import AdminDashboardMain from '@/components/AdminDashboardMain';
import PitchDeckList from '@/components/PitchDeckListV2';
import AdminDashboardUserList from '@/components/AdminDashboardUserList';
import AdminDashboardCreateUser from '@/components/AdminDashboardCreateUser';
export default {
  name: 'AdminDashboard',
  components: {
    AdminDashboardMain,
    AdminDashboardUserList,
    AdminDashboardCreateUser,
  },
  data: () => ({
    view: 'default',
  }),
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
    viewComponent () {
      return {
        default: AdminDashboardMain,
        plist: PitchDeckList,
        ulist: AdminDashboardUserList,
        ucreate: AdminDashboardCreateUser,
      }[this.view];
    },
  },
  methods: {
    onDefaultBtnClick () {
      this.view = 'default';
    },
    onPListBtnClick () {
      this.view = 'plist';
    },
    onUListBtnClick () {
      this.view = 'ulist';
    },
    onUCreateBtnClick () {
      this.view = 'ucreate';
    },
  },
};
</script>

<template>
  <div id="view">
    <div class="container">
      <div class="greeting">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {{ currentUser.username }}!</p>
      </div>
      <b-breadcrumb class="mainbread">
        <b-breadcrumb-item
          v-if="view === 'default'"
          active
          class="active-crumb"
        >
          <b-icon
            icon="house-fill"
            scale="1.25"
            shift-v="1.25"
            aria-hidden="true"
          />
          Admin
        </b-breadcrumb-item>
        <b-breadcrumb-item
          v-else
          @click="onDefaultBtnClick"
        >
          <b-icon
            icon="house-fill"
            scale="1.25"
            shift-v="1.25"
            aria-hidden="true"
            class="inactive-crumb"
          />
          Admin
        </b-breadcrumb-item>
        <b-breadcrumb-item
          v-if="view === 'plist'"
          active
          class="active-crumb"
        >
          Pitch Deck List
        </b-breadcrumb-item>
        <b-breadcrumb-item
          v-if="view === 'ulist'"
          active
          class="active-crumb"
        >
          User List
        </b-breadcrumb-item>
        <b-breadcrumb-item
          v-if="view === 'ucreate'"
          active
          class="active-crumb"
        >
          Create User
        </b-breadcrumb-item>
      </b-breadcrumb>
      <div class="dashboard-actions">
        <component
          :is="viewComponent"
          @pitch-list-btn-clicked="onPListBtnClick"
          @user-list-btn-clicked="onUListBtnClick"
          @create-user-btn-clicked="onUCreateBtnClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  h1
    color: #039
  p
    color: #007bff
  .active-crumb
    color: #039
  .inactive-crumb
    color: #007bff
  .dashboard-actions
    display: flex
    flex-direction: row
</style>
