<script>
export default {
  name: 'FounderReviewModal',
  props: {
    pitchDeck: {
      default: () => ({}),
      required: true,
      type: Object,
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
      v-for="(review,index) in pitchDeck.reviews"
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
              v-b-toggle.collapse-1
              variant="primary"
            >
              Toggle Review
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-collapse
        id="collapse-1"
        class="mt-2"
      >
        <b-card>
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
                  Is Problem Statement Present
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
                  Is Solution Description Present
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
                  Is Market Competition Present
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
                  Is Business Model Present
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
                  Is Team Present
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
                  Is Ask Present
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
                  Is Contact Slide Present
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-container>
          <p class="mt-2">
            Problem Statement Rating:
          </p>
          <b-form-rating
            v-model="review.problemStatementRating"
            readonly
          />
          <p class="mt-2">
            Solution Description Rating:
          </p>
          <b-form-rating
            v-model="review.solutionDescriptionRating"
            readonly
          />
          <p class="mt-2">
            Market Competition Rating:
          </p>
          <b-form-rating
            v-model="review.marketCompetitionRating"
            readonly
          />
          <p class="mt-2">
            Business Model Rating:
          </p>
          <b-form-rating
            v-model="review.businessModelRating"
            readonly
          />
          <p class="mt-2">
            Team Rating:
          </p>
          <b-form-rating
            v-model="review.teamRating"
            readonly
          />
          <p class="mt-2">
            Ask Rating:
          </p>
          <b-form-rating
            v-model="review.askRating"
            readonly
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

</style>
