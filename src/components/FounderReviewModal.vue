<script>
import { GET_REVIEWS_BY_PITCH_DECK_ID } from '@/store/actions.type';
import { mapActions } from 'vuex';

export default {
  name: 'FounderReviewModal',
  props: {
    pitchDeck: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },
  data: () => ({
    reviews: {},
  }),
  async created () {
    this.reviews = await this.getReviewsByPitchDeckId(this.pitchDeck.id);
  },
  methods: {
    ...mapActions({
      getReviewsByPitchDeckId: `review/${GET_REVIEWS_BY_PITCH_DECK_ID}`,
    }),
    getAdjustedValue (value) {
      return (value + 1);
    },
  },
};
</script>

<template>
  <div>
    <b-container
      class="row-top"
    >
      <b-row>
        <b-col class="mt-2">
          Reviewer:
        </b-col>
        <b-col class="mt-2">
          Created On:
        </b-col>
        <b-col />
      </b-row>
    </b-container>
    <div
      v-for="(review, index) in reviews"
      :key="review.updatedAt"
      class="review-div"
    >
      <b-container
        class="review-container"
      >
        <b-row>
          <b-col class="mt-2">
            Reviewer #{{ index + 1 }}
          </b-col>
          <b-col class="mt-2">
            {{ review.updatedAt | date }}
          </b-col>
          <b-col>
            <b-button
              v-b-toggle="'collapse-'+ index.toString()"
              variant="primary"
            >
              Toggle Review
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-collapse
        :id="'collapse-'+ index.toString()"
        class="mt-2"
      >
        <b-card>
          <p class="instruct-text">
            Are these topics covered? All components are necessary in a pitch deck:
          </p>
          <hr>
          <b-container
            class="review-checks"
          >
            <b-row>
              <b-col>
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="review.isProblemStatementPresent"
                  name="checkbox-1"
                  class="checks"
                  disabled
                >
                  Problem Statement
                </b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox
                  id="checkbox-2"
                  v-model="review.isSolutionDescriptionPresent"
                  name="checkbox-2"
                  class="checks"
                  disabled
                >
                  Solution Description
                </b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox
                  id="checkbox-3"
                  v-model="review.isMarketCompetitionPresent"
                  name="checkbox-3"
                  class="checks"
                  disabled
                >
                  Market Competition
                </b-form-checkbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-checkbox
                  id="checkbox-4"
                  v-model="review.isBusinessModelPresent"
                  name="checkbox-4"
                  class="checks"
                  disabled
                >
                  Business Model
                </b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox
                  id="checkbox-5"
                  v-model="review.isTeamPresent"
                  name="checkbox-5"
                  class="checks"
                  disabled
                >
                  Team
                </b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox
                  id="checkbox-6"
                  v-model="review.isAskPresent"
                  name="checkbox-6"
                  class="checks"
                  disabled
                >
                  Ask
                </b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox
                  id="checkbox-7"
                  v-model="review.isContactSlidePresent"
                  name="checkbox-7"
                  class="checks"
                  disabled
                >
                  Contact Slide
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-container>
          <hr>
          <p class="instruct-text">
            Topics rated 1 to 5, using 1 for missing or not addressed and 2 (low) - 5 (high) for quality:
          </p>
          <hr>
          <p class="instruct-text">
            Problem Statement Rating:
          </p>
          <p class="mt-2">
            (Vague and Rambling vs Clear and Concise)
          </p>
          <b-form-rating
            :value="getAdjustedValue(review.problemStatementRating)"
            readonly
          />
          <p class="instruct-text">
            Solution Description Rating:
          </p>
          <p class="mt-2">
            (Vague and Hard to Understand vs Clear and Concise)
          </p>
          <b-form-rating
            :value="getAdjustedValue(review.solutionDescriptionRating)"
            readonly
          />
          <p class="instruct-text">
            Market Competition Rating:
          </p>
          <p class="mt-2">
            (Not Addressed or Too Vague vs SOM Defined, Bottom Up Calculation with Competition Info)
          </p>
          <b-form-rating
            :value="getAdjustedValue(review.marketCompetitionRating)"
            readonly
          />
          <p class="instruct-text">
            Business Model Rating:
          </p>
          <p class="mt-2">
            (Vague and Leaves Many Questions Unanswered vs Clear and Sensible)
          </p>
          <b-form-rating
            :value="getAdjustedValue(review.businessModelRating)"
            readonly
          />
          <p class="instruct-text">
            Team Rating:
          </p>
          <p class="mt-2">
            (Multiple Slides and Too Much Information, Including Advisors vs 1 Slide and Concrete)
          </p>
          <b-form-rating
            :value="getAdjustedValue(review.teamRating)"
            readonly
          />
          <p class="instruct-text">
            Ask Rating:
          </p>
          <p class="mt-2">
            (Unclear or Missing vs Clear and Brief)
          </p>
          <b-form-rating
            :value="getAdjustedValue(review.askRating)"
            readonly
          />
          <hr>
          <p class="instruct-text">
            Additional advice on the deck's style, appearance and content:
          </p>
          <hr>
          <b-form-input
            id="input-additional-comments"
            v-model="review.additionalComments"
            disabled
            placeholder="Additional Comments"
          />
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<style scoped lang='sass'>
  .mt-2
    font-weight: bold
  .review-container
     margin-top: 10px
  .instruct-text
    font-weight: bold
    color: #039
</style>
