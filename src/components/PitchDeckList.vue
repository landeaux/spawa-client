<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import {
  FETCH_PITCH_DECKS,
  REWORK_PITCH_DECK,
  ACCEPT_PITCH_DECK,
  REJECT_PITCH_DECK,
} from '@/store/actions.type';
import PitchDeckReviewForm from '@/components/PitchDeckReviewForm';
import AdminSeeReviewModal from '@/components/AdminSeeReviewModal';
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
    AdminSeeReviewModal,
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
      reworkPitchDeck: `${PITCH_DECK}/${REWORK_PITCH_DECK}`,
      acceptPitchDeck: `${PITCH_DECK}/${ACCEPT_PITCH_DECK}`,
      rejectPitchDeck: `${PITCH_DECK}/${REJECT_PITCH_DECK}`,
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
        try {
          const reviewId = intersection(pitchDeckReviews, currentUserReviews)[0];
          return reviewId || '';
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(error);
          }
          return '';
        }
      } else {
        return '';
      }
    },
    reviewModalId (id) {
      return `review-${id}`;
    },
    acceptModalId (id) {
      return `accept-${id}`;
    },
    reworkModalId (id) {
      return `rework-${id}`;
    },
    rejectModalId (id) {
      return `reject-${id}`;
    },
    seeReviewsModalId (id) {
      return `see-reviews-${id}`;
    },
    async onReviewSubmitSuccess () {
      await this.fetchPitchDecks();
    },
    async onAcceptButtonOk (pitchDeckId) {
      await this.acceptPitchDeck({
        id: pitchDeckId,
      });
      await this.fetchPitchDecks();
    },
    async onReworkButtonOk (pitchDeckId) {
      await this.reworkPitchDeck({
        id: pitchDeckId,
      });
      await this.fetchPitchDecks();
    },
    async onRejectButtonOk (pitchDeckId) {
      await this.rejectPitchDeck({
        id: pitchDeckId,
      });
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
      :show="true"
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
              variant="success"
              class="list-icon"
            />
            <b-icon-exclamation-circle
              v-else
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
            boundary="viewport"
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

            <b-dropdown-item
              v-if="currentUser.role === 'admin'"
              v-b-modal="acceptModalId(row.item.id)"
              class="inside-drop"
            >
              Accept Pitchdeck
            </b-dropdown-item>
            <b-modal
              :id="acceptModalId(row.item.id)"
              size="lg"
              centered
              title="Suspend User"
              @ok="onAcceptButtonOk(row.item.id)"
            >
              <p class="mod-text">
                Are you sure you want to accept {{ row.item.company }}'s pitch deck?
              </p>
            </b-modal>

            <b-dropdown-item
              v-if="currentUser.role === 'admin'"
              v-b-modal="reworkModalId(row.item.id)"
              class="inside-drop"
            >
              Return For Rework
            </b-dropdown-item>
            <b-modal
              :id="reworkModalId(row.item.id)"
              size="lg"
              centered
              title="Suspend User"
              @ok="onReworkButtonOk(row.item.id)"
            >
              <p class="mod-text">
                Are you sure you want to send {{ row.item.company }}'s pitch deck back for rework?
              </p>
            </b-modal>

            <b-dropdown-item
              v-if="currentUser.role === 'admin'"
              v-b-modal="rejectModalId(row.item.id)"
              class="inside-drop"
            >
              Reject Pitchdeck
            </b-dropdown-item>
            <b-modal
              :id="rejectModalId(row.item.id)"
              size="lg"
              centered
              title="Suspend User"
              @ok="onRejectButtonOk(row.item.id)"
            >
              <p class="mod-text">
                Are you sure you want to reject {{ row.item.company }}'s pitch deck?
              </p>
            </b-modal>

            <b-dropdown-item
              v-if="currentUser.role === 'admin'"
              v-b-modal="seeReviewsModalId(row.item.id)"
              class="inside-drop"
            >
              See All Reviews
            </b-dropdown-item>
            <b-modal
              :id="seeReviewsModalId(row.item.id)"
              size="lg"
              centered
              title="All Reviews"
            >
              <AdminSeeReviewModal
                :pitch-deck="row.item"
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
