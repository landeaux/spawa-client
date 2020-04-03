import format from 'date-fns/format';

export default (date, formatString = 'eee, PP') => {
  return format(new Date(date), formatString);
};
