<script>
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<template>
  <div id="app">
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

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
  font-size: 1.25rem
  display: flex
  flex-direction: column
  height: 100%
  -moz-osx-font-smoothing: grayscale
  text-align: center
  -webkit-font-smoothing: antialiased
  button
    font-size: 1.25rem
  #view
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    height: $view-height
    overflow-y: auto
    top: $header-height
    > .loader
      position: relative
      height: 100%
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
  a
    color: #039
    text-decoration: none
    &:hover
      color: #069
      text-decoration: none
  .table-cell
    vertical-align: middle
  .table-header-row
    th
      &:focus
        outline: none
</style>
