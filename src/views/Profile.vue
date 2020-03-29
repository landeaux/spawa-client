<script>
import { mapGetters } from 'vuex';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_BY_USERNAME,
} from '@/store/actions.type';

export default {
  name: 'TheProfile',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data: () => ({
    state: 'INIT',
  }),
  computed: {
    ...mapGetters([
      'currentUser',
      'profile',
      'isAuthenticated',
      'profileErrors',
    ]),
    currentUserIsAdmin () {
      return this.currentUser
        ? this.currentUser.role === 'admin'
        : false;
    },
    showLoader () {
      return this.state === 'INIT';
    },
    showError () {
      return this.state === 'FETCH_ERROR';
    },
    company () {
      return this.profile.pitchDeck
        ? this.profile.pitchDeck.company
        : '';
    },
  },
  watch: {
    $route (to) {
      this.fetchProfile(to.params);
    },
    currentUser () {
      this.fetchProfile(this.$route.params);
    },
    profileErrors () {
      if (this.profileErrors.length > 0) this.state = 'FETCH_ERROR';
    },
    profile () {
      if (this.profile) this.state = 'FETCH_SUCCESS';
    },
  },
  async mounted () {
    await this.fetchProfile(this.$route.params);
  },
  methods: {
    async fetchProfile (params) {
      const { username } = params;
      if (this.currentUser.username) {
        if (this.currentUser.username === username) {
          await this.$store.dispatch(FETCH_PROFILE);
        } else {
          await this.$store.dispatch(FETCH_PROFILE_BY_USERNAME, params);
        }
      }
    },
    isCurrentUser () {
      if (this.currentUser.username) {
        return this.currentUser.username === this.$route.params.username;
      }
      return false;
    },
  },
};
</script>

<template>
  <div
    id="view"
    class="profile-page"
  >
    <PulseLoader
      v-if="showLoader"
      class="loader"
      color="blue"
      size="25px"
    />
    <div
      v-else-if="showError"
    >
      There was an error fetching the profile.
    </div>
    <div
      v-else
      class="user-info"
    >
      <div class="container">
        <div>
          <div class="header">
            <h1>{{ company }}</h1>
            <div v-if="isCurrentUser()">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit User Settings
              </router-link>
            </div>
            <div v-else-if="currentUserIsAdmin">
              <a
                class="btn btn-sm btn-outline-secondary action-btn"
                :href="profile.profileUrl"
              >
                HubSpot Profile
              </a>
            </div>
          </div>
        </div>
        <div>
          <h2>Eapp</h2>
          <ul>
            <li
              v-for="(value, key) in profile.eapp"
              :key="key"
            >
              <strong>{{ key | startCase }}:</strong> {{ value }}
            </li>
          </ul>
        </div>
        <div>
          <h2>Pitch Quiz</h2>
          <ul>
            <li
              v-for="(value, key) in profile.pitchQuiz"
              :key="key"
            >
              <strong>{{ key | startCase }}:</strong> {{ value }}
            </li>
          </ul>
        </div>
        <div>
          <h2>Pitch Deck</h2>
          <ul>
            <li
              v-for="(value, key) in profile.pitchDeck"
              :key="key"
            >
              <strong>{{ key | startCase }}:</strong> {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  #view
    text-align: left
    .header
      text-align: center
      background: #f3f3f3
      padding: 2rem 0 1rem
    li
      list-style: none
</style>
