<template>
  <div id="app">
    <RwvHeader />
    <router-view />
    <RwvFooter />
  </div>
</template>

<script>
import RwvHeader from '@/components/TheHeader'
import RwvFooter from '@/components/TheFooter'

export default {
  name: 'App',
  components: {
    RwvHeader,
    RwvFooter
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

a
  color: #039
  text-decoration: none

  &:hover
    color: #069
    text-decoration: none
</style>
