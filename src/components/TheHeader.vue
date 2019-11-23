<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RwvHeader',
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  }
}
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
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'settings' }"
          >
            Settings
          </router-link>
        </li>
        <li
          v-if="currentUser.username"
          class="nav-item"
        >
          <router-link
            class="nav-link"
            active-class="active"
            :to="{
              name: 'profile',
              params: { username: currentUser.username }
            }"
          >
            {{ currentUser.username }}
          </router-link>
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
</style>
