import en from 'vee-validate/dist/locale/en.json';
import {
  extend,
  localize,
} from 'vee-validate';
import {
  alpha_num as alphaNum,
  email,
  required,
  required_if as requiredIf,
} from 'vee-validate/dist/rules';

localize('en', en);

/**
 * Built-in rules
 */
extend('alpha_num', alphaNum);
extend('email', email);
extend('required', required);
extend('required_if', requiredIf);

/**
 * Custom rules
 */
extend('password', {
  params: ['target'],
  validate (value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match',
});
