import moment from 'moment';

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// date formatter 2019.01.23
export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD')
}

// parse string to int
export const filterInt = (value) => {
  if (/^(-|\+)?(\d+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}


export const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`
