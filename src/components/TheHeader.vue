<script>
import { mapGetters } from 'vuex';
import {
  LOGOUT,
} from '@/store/actions.type';

export default {
  name: 'TheHeader',
  computed: {
    ...mapGetters([
      'currentUser',
      'isAuthenticated',
    ]),
  },
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: 'login' });
      });
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link
        class="navbar-brand"
        :to="{ name: 'home' }"
      >
        <span style="color: red">START<b>UP</b></span><span style="color: blue"><b>NV</b></span>
      </router-link>
      <ul
        v-if="!isAuthenticated"
        class="nav navbar-nav pull-xs-right"
      >
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }"
          >
            Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'register' }"
          >
            Sign up
          </router-link>
        </li>
      </ul>
      <ul
        v-else
        class="nav navbar-nav pull-xs-right"
      >
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <div class="dropdown">
            <button class="dropbtn user-dropdown">
              {{ currentUser.username }}
            </button>
            <div class="dropdown-content">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{
                  name: 'profile',
                  params: { username: currentUser.username }
                }"
              >
                Profile
              </router-link>
              <router-link
                class="nav-link"
                active-class="active"
                exact
                :to="{ name: 'settings' }"
              >
                Settings
              </router-link>
              <button
                class="btn btn-outline-danger"
                @click="logout"
              >
                Logout
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="css">
  .navbar-nav {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .navbar-nav .nav-item+.nav-item {
    margin-left: 1rem;
  }
  .navbar-nav .nav-link {
    display: block;
    padding-top: .425rem;
    padding-bottom: .425rem;
  }
  .navbar-light .navbar-nav .nav-link .active {
    color: rgba(0,0,0,.8);
  }
  .dropdown {
    position: relative;
    display: inline-block;
    color: #039;
  }
  .dropbtn {
    padding-top: .425rem;
    padding-bottom: .425rem;
    min-width: 100px;
    background-color: #007bff;
    border: none;
    border-radius: .25rem;
    color: #fff;
    font-weight: bold;

  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 100px;
    z-index: 1;
    border-radius: .25rem;
  }

  .dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content button {
    width: 100%;
    border: none;
    border-radius: 0;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
</style>
