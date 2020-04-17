<script>
import { FETCH_USERS } from '@/store/actions.type';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminDashboardUserList',
  components: {
    AdminDashboardModifyUser: () => import('@/components/AdminDashboardModifyUser'),
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data: () => ({
    sortBy: 'role',
    sortDesc: false,
    state: 'INIT',
    tableFields: [
      {
        key: 'active',
        label: 'Active',
        sortable: true,
        tdClass: 'table-cell',
      },
      {
        key: 'username',
        label: 'Username',
        sortable: true,
        tdClass: 'table-cell',
      },
      {
        key: 'role',
        label: 'Role',
        sortable: true,
        tdClass: 'table-cell',
      },
      {
        key: 'company',
        label: 'Company',
        sortable: true,
        tdClass: 'table-cell',
      },
      {
        key: 'createdAt',
        label: 'User Since',
        sortable: true,
        tdClass: 'table-cell',
      },
      {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        tdClass: 'table-cell',
      },
    ],
  }),
  computed: {
    ...mapGetters([
      'userErrors',
      'userList',
    ]),
    showError () {
      return this.userErrors.length > 0;
    },
    showLoader () {
      return this.state === 'INIT';
    },
  },
  async created () {
    await this.$store.dispatch(FETCH_USERS);
    this.state = 'FETCH_COMPLETE';
  },
};
</script>

<template>
  <div class="root">
    <PulseLoader
      v-if="showLoader"
      class="loader"
      color="blue"
      size="25px"
    />
    <b-alert
      v-else-if="showError"
      show="true"
      variant="danger"
    >
      There was an error fetching the user list.
    </b-alert>
    <b-table
      v-else
      :items="userList"
      :fields="tableFields"
      :sort-by.sync="sortBy"
      :sort-desc="sortDesc"
      head-variant="light"
      sticky-header="100%"
      tbody-tr-class="table-row"
      striped
      hover
    >
      <template v-slot:cell(active)="row">
        <div style="vertical-align: center">
          <b-icon
            v-if="row.item.active"
            icon="check-circle"
            variant="success"
            class="list-icon"
          />
          <b-icon
            v-else
            icon="alert-circle"
            class="list-icon"
          />
        </div>
      </template>

      <template v-slot:cell(username)="row">
        <router-link
          class="nav-link"
          active-class="active"
          :to="{
            name: 'profile',
            params: { username: row.item.username }
          }"
        >
          {{ row.item.username }}
        </router-link>
      </template>

      <template v-slot:cell(role)="row">
        {{ row.item.role.charAt(0).toUpperCase() + row.item.role.slice(1) }}
      </template>

      <template v-slot:cell(createdAt)="row">
        {{ row.item.createdAt | date }}
      </template>

      <template v-slot:cell(actions)="row">
        <b-dropdown
          variant="primary"
          text="Actions"
          class="table-actions"
        >
          <b-dropdown-item
            v-b-modal="`mod-${row.item.id}`"
            class="inside-drop"
          >
            Modify
          </b-dropdown-item>
          <b-modal
            :id="`mod-${row.item.id}`"
            size="lg"
            centered
            :hide-footer="true"
            title="Modify User"
          >
            <AdminDashboardModifyUser
              :user="row.item"
            />
          </b-modal>
          <b-dropdown-item
            v-b-modal="`sus-${row.item.id}`"
            class="inside-drop"
          >
            Suspend
          </b-dropdown-item>
          <b-modal
            :id="`sus-${row.item.id}`"
            size="lg"
            centered
            title="Suspend User"
          >
            <p class="mod-text">
              Are you sure you want to suspend {{ row.item.username }}?
            </p>
          </b-modal>
          <b-dropdown-item
            v-b-modal="`del-${row.item.id}`"
            class="inside-drop"
          >
            Delete
          </b-dropdown-item>
          <b-modal
            :id="`del-${row.item.id}`"
            size="lg"
            centered
            title="Delete User"
          >
            <p class="mod-text">
              Are you sure you want to delete {{ row.item.username }}?
            </p>
          </b-modal>
        </b-dropdown>
      </template>
    </b-table>
  </div>
</template>

<style scoped lang="sass">
  @import 'src/assets/sass/vars'
  div.root
    height: calc(100% - #{$footer-height})
    display: flex
    flex-flow: column nowrap
    width: 100%
  .bot-margin
    margin-bottom: 8px
  .list-icon
    font-size: 1.5rem
</style>
