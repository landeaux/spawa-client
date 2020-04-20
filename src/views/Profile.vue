<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_BY_USERNAME,
} from '@/store/actions.type';

/**
 * TheProfile
 *
 * The Profile view.
 */
export default {
  name: 'TheProfile',
  components: {
    PulseLoader: () => import('vue-spinner/src/PulseLoader.vue'),
  },
  data: () => ({
    state: 'INIT',
  }),
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      isAuthenticated: 'auth/isAuthenticated',
      profile: 'profile/profile',
      profileErrors: 'profile/profileErrors',
    }),
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
    profileHeaderText () {
      return this.profile.pitchDeck.company;
    },
  },
  watch: {
    $route (to) {
      this.handleFetchProfile(to.params);
    },
    currentUser () {
      this.handleFetchProfile(this.$route.params);
    },
    profileErrors () {
      if (this.profileErrors.length > 0) this.state = 'FETCH_ERROR';
    },
    profile () {
      if (this.profile) this.state = 'FETCH_SUCCESS';
    },
  },
  async mounted () {
    await this.handleFetchProfile(this.$route.params);
  },
  methods: {
    ...mapActions('profile', {
      fetchProfile: FETCH_PROFILE,
      fetchProfileByUsername: FETCH_PROFILE_BY_USERNAME,
    }),
    async handleFetchProfile (params) {
      const { username } = params;
      if (this.currentUser.username) {
        if (this.currentUser.username === username) {
          await this.fetchProfile();
        } else {
          await this.fetchProfileByUsername(params);
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
          <div class="header jumbotron">
            <h1>{{ profileHeaderText }}</h1>
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
    .user-info
      width: 100%
    .header
      text-align: center
      padding: 2rem 0 1rem
    li
      list-style: none
</style>
