<script>
import {
  FETCH_PITCH_DECKS,
} from '@/store/actions.type';
import {
  mapGetters,
} from 'vuex';

/**
 * PitchDeckList
 */
export default {
  name: 'PitchDeckList',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data: () => ({
    sortBy: 'createdAt',
    sortDesc: true,
    state: 'INIT',
    tableFields: [
      {
        key: 'userHasReviewed',
        label: 'Reviewed By You?',
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
        label: 'Date Submitted',
        sortable: true,
        tdClass: 'table-cell',
      },
      {
        key: 'numReviews',
        label: 'Review Count',
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
      'currentUser',
      'pitchDeckErrors',
      'pitchDeckList',
    ]),
    pitchDeckListForDisplay () {
      return this.pitchDeckList
        .filter((p) => !p.accepted)
        .map((p) => {
          const augmentedPitchDeck = { ...p };
          augmentedPitchDeck.numReviews = p.reviews.length;
          // #todo Need to check intersection of user's reviews and pitch deck's reviews
          augmentedPitchDeck.userHasReviewed = false;
          return augmentedPitchDeck;
        });
    },
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
  <div
    class="root"
  >
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
      There was an error fetching the pitch deck list.
    </b-alert>

    <div v-else>
      <b-table
        :items="pitchDeckListForDisplay"
        :fields="tableFields"
        :sort-by.sync="sortBy"
        :sort-desc="sortDesc"
        head-variant="light"
        sticky-header="100%"
        tbody-tr-class="table-row"
        striped
        hover
      >
        <template v-slot:cell(userHasReviewed)="row">
          <div style="vertical-align: center">
            <b-icon
              v-if="row.item.userHasReviewed"
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
              class="inside-drop"
            >
              Review
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </div>
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
