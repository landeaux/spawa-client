<script>
import AdminDashboardModifyUser from '@/components/AdminDashboardModifyUser';
export default {
  name: 'AdminDashboardUserListItem',
  components: {
    AdminDashboardModifyUser,
  },
  props: {
    created: {
      default: '',
      required: true,
      type: String,
    },
    user: {
      default: null,
      required: true,
      type: Object,
    },
  },
  computed: {
    getModifyModalId () {
      return 'modify' + this.user.username;
    },
    getSuspendModalId () {
      return 'suspend' + this.user.username;
    },
    getDeleteModalId () {
      return 'delete' + this.user.username;
    },
  },
};
</script>

<template>
  <div class="main-box">
    <b-icon
      v-if="user.active"
      icon="check-circle"
      variant="success"
      class="row-flex list-icon"
    />
    <b-icon
      v-else
      icon="alert-circle"
      class="row-flex list-icon"
    />
    <p class="row-flex">
      {{ user.username }}
    </p>
    <p class="row-flex">
      {{ user.role.charAt(0).toUpperCase() + row.item.role.slice(1) }}
    </p>
    <p class="row-flex date-type">
      {{ created | date }}
    </p>
    <b-dropdown
      variant="primary"
      text="Actions"
      class="row-flex"
    >
      <b-dropdown-item
        v-b-modal="getModifyModalId"
        class="inside-drop"
      >
        Modify
      </b-dropdown-item>
      <b-modal
        :id="getModifyModalId"
        size="lg"
        centered
        title="Modify User"
      >
        <p class="mod-text">
          <AdminDashboardModifyUser
            :user="user"
          />
        </p>
      </b-modal>
      <b-dropdown-item
        v-b-modal="getSuspendModalId"
        class="inside-drop"
      >
        Suspend
      </b-dropdown-item>
      <b-modal
        :id="getSuspendModalId"
        size="lg"
        centered
        title="Suspend User"
      >
        <p class="mod-text">
          Are you sure you want to suspend {{ user.username }}?
        </p>
      </b-modal>
      <b-dropdown-item
        v-b-modal="getDeleteModalId"
        class="inside-drop"
      >
        Delete
      </b-dropdown-item>
      <b-modal
        :id="getDeleteModalId"
        size="lg"
        centered
        title="Delete User"
      >
        <p class="mod-text">
          Are you sure you want to delete {{ user.username }}?
        </p>
      </b-modal>
    </b-dropdown>
  </div>
</template>

<style scoped lang = sass>
  .main-box
    width: 70vw
    border-radius: 8px
    background: rgba(40, 216, 255, 0.39)
    color: #039
    font-size: 20px
  .row-flex
    display: inline-flex
    flex-direction: row
    flex-wrap: nowrap
    width: 20%
    font-size: 16px
    margin: 10px
    font-weight: bold
  .list-icon
    margin: 0 0 -5px
    font-size: 2rem
  .inside-drop
    text-align: center
  .mod-text
    font-size: 16px
    font-weight: bold
  .date-type
    font-size: 10px
</style>
