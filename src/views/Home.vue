<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<template>
  <div id="view">
    <router-link
      class="nav-link"
      :to="{ name: 'book-pitch-date' }"
    >
      <button
        type="button"
        class="btn btn-primary"
      >
        Book a Pitch Date
      </button>
    </router-link>
  </div>
</template>
