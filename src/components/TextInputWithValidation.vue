<script>
import {
  ValidationProvider,
} from 'vee-validate';

/**
 * TextInputWithValidation
 *
 * The TextInputWithValidation component. Wraps all markup and logic related to
 * a textual-based input (type = text, email, url, etc) and provides validation
 * via VeeValidate.
 */
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
    vid: {
      default: '',
      required: false,
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
    v-slot="{ errors, ariaInput, ariaMsg, failed, passed }"
    :name="label"
    :rules="rules"
    :vid="vid"
  >
    <b-form-group
      :id="`${id}-group`"
      :label="label"
      :label-for="id"
      class="form-group"
    >
      <input
        :id="id"
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        :class="{
          'form-control': true,
          'form-control-lg': true,
          'is-invalid': failed,
        }"
        v-bind="ariaInput"
      >
      <b-form-invalid-feedback
        :id="`${id}-feedback`"
        :state="passed"
        v-bind="ariaMsg"
      >
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<style scoped lang="sass">
  .form-group
    text-align: left
</style>
