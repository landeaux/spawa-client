<script>
export default {
  name: 'TheFooter',
};
</script>

<template>
  <footer>
    <div class="container">
      <router-link
        class="logo-font"
        :to="{ name: 'home', params: {} }"
      >
        <span style="color: red">START<b>UP</b></span><span style="color: blue"><b>NV</b></span>
      </router-link>
      <span class="attribution">
        A web application from
        <a
          rel="noopener noreferrer"
          target="blank"
          href="https://startupnv.org"
        >
          StartUpNV
        </a>.
      </span>
    </div>
  </footer>
</template>

<style scoped lang="sass">
  footer
    background: #f3f3f3
    margin-top: 3rem
    padding: 1rem 0
    position: absolute
    bottom: 0
    width: 100%
</style>
