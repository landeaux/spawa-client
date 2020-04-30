import { extend } from 'vee-validate';
import {
  email,
  required,
} from 'vee-validate/dist/rules';

extend('email', email);

extend('required', {
  ...required,
  message: '{_field_} is required.',
});

/**
 * Custom rules
 */
extend('equivalent', {
  params: ['target'],
  validate (value, { target }) {
    return value === target;
  },
  message: '{_field_} field does not match {target} field.',
});
