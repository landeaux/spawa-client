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
    num: {
      default: 0,
      required: false,
      type: Number,
    },
  },
};
</script>

<template>
  <button
    type="button"
    class="big-button btn btn-primary"
  >
    <b>{{ title }}</b><br>{{ subtitle }} {{ num }}
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
