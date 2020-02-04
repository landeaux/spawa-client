<script>
import { mapGetters } from 'vuex';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_BY_USERNAME,
} from '@/store/actions.type';

export default {
  name: 'RwvProfile',
  computed: {
    ...mapGetters([
      'currentUser',
      'profile',
      'isAuthenticated',
    ]),
  },
  watch: {
    $route (to) {
      this.fetchProfile(to.params);
    },
    currentUser () {
      this.fetchProfile(this.$route.params);
    },
  },
  mounted () {
    this.fetchProfile(this.$route.params);
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
      if (this.currentUser.username && this.profile.username) {
        return this.currentUser.username === this.profile.username;
      }
      return false;
    },
  },
};
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              :src="profile.image"
              class="user-img"
            >
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div v-if="isCurrentUser()">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  .profile-page .user-info
    text-align: center
    background: #f3f3f3
    padding: 2rem 0 1rem

  .profile-page .user-info .user-img
    width: 100px
    height: 100px
    border-radius: 100px
    margin-bottom: 1rem
</style>
