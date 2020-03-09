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
  >
    <b>{{ title }}</b><br>{{ subtitle }} {{ info }}
  </button>
</template>

<style scoped>
  .big-button {
    font-size: 120%;
    width: 15rem;
    height: 15rem;
    border-radius: 16px;
  }
</style>
