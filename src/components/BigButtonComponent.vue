<script>
export default {
  name: 'BigButtonComponent',
  props: {
    title: {
      default: '',
      required: true,
      type: String,
    },
    subtitle: {
      default: '',
      required: false,
      type: String,
    },
    info: {
      default: '',
      required: false,
      type: String,
    },
  },
};
</script>

<template>
  <button
    type="button"
    class="big-button btn btn-primary"
    :disabled="$attrs.disabled"
  >
    <b>{{ title }}</b><br>{{ subtitle }} {{ info }}
  </button>
</template>

<style scoped lang="sass">
  .big-button
    font-size: 120%
    width: 15rem
    height: 15rem
    border-radius: 16px
    -webkit-box-shadow: 7px 7px 16px -8px rgba(0,0,0,0.93)
    -moz-box-shadow: 7px 7px 16px -8px rgba(0,0,0,0.93)
    box-shadow: 7px 7px 16px -8px rgba(0,0,0,0.93)

  button[disabled]
    cursor: not-allowed
    background-color: #5a6268
    border-color: #5a6268
</style>
