<script>
export default {
  name: 'AdminDashboardUserListItem',
  props: {
    active: {
      default: false,
      required: true,
      type: Boolean,
    },
    username: {
      default: '',
      required: true,
      type: String,
    },
    created: {
      default: '',
      required: true,
      type: String,
    },
  },
  computed: {
    getModifyModalId () {
      return 'modify' + this.username;
    },
    getSuspendModalId () {
      return 'suspend' + this.username;
    },
    getDeleteModalId () {
      return 'delete' + this.username;
    },
  },
};
</script>

<template>
  <div class="main-box">
    <b-icon
      v-if="active"
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
      {{ username }}
    </p>
    <p class="row-flex">
      {{ created }}
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
          Are you sure you want to modify {{ username }}?
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
          Are you sure you want to suspend {{ username }}?
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
          Are you sure you want to delete {{ username }}?
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
</style>
