<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import {
  FETCH_PITCH_DECKS,
} from '@/store/actions.type';
import PitchDeckReviewForm from '@/components/PitchDeckReviewForm';
import { intersection } from 'lodash/array';

/**
 * Vuex module names
 */
const AUTH = 'auth';
const PITCH_DECK = 'pitchDeck';

/**
 * States
 */
const INIT = 0;
const FETCH_COMPLETE = 1;

/**
 * PitchDeckList
 *
 * The Pitch Deck List component.
 */
export default {
  name: 'PitchDeckList',
  components: {
    PitchDeckReviewForm,
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data: () => ({
    sortBy: 'createdAt',
    sortDesc: true,
    state: INIT,
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
    ...mapGetters({
      currentUser: `${AUTH}/currentUser`,
      pitchDeckErrors: `${PITCH_DECK}/pitchDeckErrors`,
      pitchDeckList: `${PITCH_DECK}/pitchDeckList`,
    }),
    pitchDeckListForDisplay () {
      return this.pitchDeckList
        .filter((p) => !p.accepted)
        .map((p) => {
          return {
            ...p,
            numReviews: p.reviews.length,
            userHasReviewed: this.userHasReviewed(p),
            usersReview: this.getUsersReviewId(p),
          };
        });
    },
    showError () {
      return this.pitchDeckErrors.length > 0;
    },
    showLoader () {
      return this.state === INIT;
    },
  },
  async created () {
    await this.fetchPitchDecks();
    this.state = FETCH_COMPLETE;
  },
  methods: {
    ...mapActions({
      fetchPitchDecks: `${PITCH_DECK}/${FETCH_PITCH_DECKS}`,
    }),
    userHasReviewed (pitchDeck) {
      const pitchDeckReviews = pitchDeck.reviews;
      const currentUserReviews = this.currentUser.reviews;
      return pitchDeckReviews.some((r) => currentUserReviews.includes(r));
    },
    getUsersReviewId (pitchDeck) {
      if (this.userHasReviewed) {
        const pitchDeckReviews = pitchDeck.reviews;
        const currentUserReviews = this.currentUser.reviews;
        let reviewId;
        try {
          reviewId = intersection(pitchDeckReviews, currentUserReviews)[0];
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(error);
          }
          return '';
        }
        return reviewId;
      } else {
        return '';
      }
    },
    reviewModalId (id) {
      return `review-${id}`;
    },
    async onReviewSubmitSuccess () {
      await this.fetchPitchDecks();
    },
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
        thead-tr-class="table-header-row"
        tbody-tr-class="table-row"
        striped
        outlined
        hover
      >
        <template v-slot:cell(userHasReviewed)="row">
          <div style="vertical-align: center">
            <b-icon-check-circle
              v-if="row.item.userHasReviewed"
              icon="check-box"
              variant="success"
              class="list-icon"
            />
            <b-icon
              v-else
              icon="exclamation-circle"
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
              v-b-modal="reviewModalId(row.item.id)"
              class="inside-drop"
            >
              Review
            </b-dropdown-item>
            <b-modal
              :id="reviewModalId(row.item.id)"
              size="lg"
              centered
              :hide-footer="true"
              title="Review User Pitchdeck"
            >
              <PitchDeckReviewForm
                :pitch-deck="row.item"
                @review-submit-success="onReviewSubmitSuccess"
              />
            </b-modal>
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
