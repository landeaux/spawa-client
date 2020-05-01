import en from 'vee-validate/dist/locale/en.json';
import {
  extend,
  localize,
  setInteractionMode,
} from 'vee-validate';
import {
  alpha_num as alphaNum,
  email,
  // regex,
  required,
} from 'vee-validate/dist/rules';

setInteractionMode('eager');

localize('en', en);

/**
 * Built-in rules
 */
extend('alpha_num', alphaNum);
extend('email', email);
extend('required', required);

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
