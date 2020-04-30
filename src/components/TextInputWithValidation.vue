<script>
// #todo Pass all implied rules as native html input props
import {
  ValidationProvider,
} from 'vee-validate';

export default {
  name: 'TextInputWithValidation',
  components: {
    ValidationProvider,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    disabled: {
      default: false,
      required: false,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
    placeholder: {
      default: null,
      required: false,
      type: String,
    },
    required: {
      default: false,
      required: false,
      type: Boolean,
    },
    rules: {
      default: '',
      required: false,
      type: [Object, String],
    },
    type: {
      type: String,
      default: 'text',
      required: false,
      validator (value) {
        return [
          'url',
          'text',
          'password',
          'tel',
          'search',
          'number',
          'email',
        ].includes(value);
      },
    },
    /**
     * Prop for holding the input data. Must not be removed.
     *
     * Note: This should never be set as required. Passing anything for this
     * prop from the parent does nothing; this is only so that VeeValidate
     * works correctly. A value from the parent should be bound to this
     * component through the v-model prop.
     */
    value: {
      default: null,
      required: false,
      type: null,
    },
  },
  data: () => ({
    innerValue: '',
  }),
  watch: {
    // Handles internal model changes.
    innerValue (newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value (newVal) {
      this.innerValue = newVal;
    },
  },
  created () {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>

<template>
  <ValidationProvider
    v-slot="{ errors, touched, ariaInput, ariaMsg, classes }"
    :name="label"
    :rules="rules"
  >
    <label>{{ label }}
      <input
        :id="id"
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        class="form-control form-control-lg"
        :class="classes"
        v-bind="ariaInput"
      >
    </label>
    <span
      v-bind="ariaMsg"
      class="form-field-error"
    >
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<style scoped lang="sass">
  label
    font-weight: bold
    margin-bottom: 0
    width: 100%
  .form-field-error
    color: red
    font-size: 1rem
</style>
