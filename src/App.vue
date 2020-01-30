<template>
  <div id="app">
    <RwvHeader />
    <router-view />
    <RwvFooter />
  </div>
</template>

<script>
import RwvHeader from '@/components/TheHeader';
import RwvFooter from '@/components/TheFooter';

export default {
  name: 'App',
  components: {
    RwvHeader,
    RwvFooter,
  },
};
</script>

<style lang="sass">
@import 'assets/sass/vars'
html, body
  height: 100%
body
  margin: 0
  display: flex
  flex-direction: column
#app
  box-sizing: border-box
  color: #2c3e50
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  display: flex
  flex-direction: column
  height: 100%
  -moz-osx-font-smoothing: grayscale
  text-align: center
  -webkit-font-smoothing: antialiased
  #view
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    height: $view-height
    overflow-y: auto
    top: $header-height
  a
    color: #039
    text-decoration: none
    &:hover
      color: #069
      text-decoration: none
</style>
