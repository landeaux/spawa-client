<script>
import {
  FETCH_USERS,
  DELETE_USER,
  SUSPEND_USER,
  ACTIVATE_USER,
} from '@/store/actions.type';
import { createNamespacedHelpers } from 'vuex';

const {
  mapActions,
  mapGetters,
} = createNamespacedHelpers('user');

/**
 * AdminDashboardUserList
 *
 * The User List component in the Admin Dashboard.
 */
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
    await this.fetchUsers();
    this.state = 'FETCH_COMPLETE';
  },
  methods: {
    ...mapActions({
      fetchUsers: FETCH_USERS,
      deleteUser: DELETE_USER,
      suspendUser: SUSPEND_USER,
      activateUser: ACTIVATE_USER,
    }),
    async onDeleteButtonOk (userId) {
      await this.deleteUser(userId);
    },
    async onSuspendButtonOk (userId, active) {
      const action = active
        ? this.suspendUser
        : this.activateUser;
      await action(userId);
    },
    modifyModalId (id) {
      return `mod-${id}`;
    },
    suspendModalId (id) {
      return `sus-${id}`;
    },
    deleteModalId (id) {
      return `del-${id}`;
    },
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
      thead-tr-class="table-header-row"
      tbody-tr-class="table-row"
      striped
      outlined
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
            v-b-modal="modifyModalId(row.item.id)"
            class="inside-drop"
          >
            Modify
          </b-dropdown-item>
          <b-modal
            :id="modifyModalId(row.item.id)"
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
            v-b-modal="suspendModalId(row.item.id)"
            class="inside-drop"
          >
            {{ row.item.active ? 'Suspend' : 'Activate' }}
          </b-dropdown-item>
          <b-modal
            :id="suspendModalId(row.item.id)"
            size="lg"
            centered
            title="Suspend User"
            @ok="onSuspendButtonOk(row.item.id, row.item.active)"
          >
            <p class="mod-text">
              Are you sure you want to {{ row.item.active ? 'suspend' : 'activate' }} {{ row.item.username }}?
            </p>
          </b-modal>

          <b-dropdown-item
            v-b-modal="deleteModalId(row.item.id)"
            class="inside-drop"
          >
            Delete
          </b-dropdown-item>
          <b-modal
            :id="deleteModalId(row.item.id)"
            size="lg"
            centered
            title="Delete User"
            @ok="onDeleteButtonOk(row.item.id)"
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
