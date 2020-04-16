<script>
import {
  FETCH_PITCH_DECKS,
} from '@/store/actions.type';
import {
  mapGetters,
} from 'vuex';

export default {
  name: 'AdminDashboardUserList',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data: () => ({
    state: 'INIT',
    tableFields: [
      {
        key: '',
        label: '',
        tdClass: 'table-cell',
      },
    ],
  }),
  computed: {
    ...mapGetters([
      'pitchDeckErrors',
      'pitchDeckList',
    ]),
    showError () {
      return this.pitchDeckErrors.length > 0;
    },
    showLoader () {
      return this.state === 'INIT';
    },
  },
  async created () {
    await this.$store.dispatch(FETCH_PITCH_DECKS);
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
      striped
      hover
      :items="pitchDeckList"
      :fields="tableFields"
      head-variant="light"
      sticky-header="100%"
      tbody-tr-class="table-row"
    >
<!--      <template v-slot:cell(active)="row">-->
<!--        <div style="vertical-align: center">-->
<!--          <b-icon-->
<!--            v-if="row.item.active"-->
<!--            icon="check-circle"-->
<!--            variant="success"-->
<!--            class="list-icon"-->
<!--          />-->
<!--          <b-icon-->
<!--            v-else-->
<!--            icon="alert-circle"-->
<!--            class="list-icon"-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->

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
            v-b-modal="`action1-${row.item.id}`"
            class="inside-drop"
          >
            Action 1
          </b-dropdown-item>
          <b-modal
            :id="`action1-${row.item.id}`"
            size="lg"
            centered
            title="Action 1"
          >
            Action 1
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
