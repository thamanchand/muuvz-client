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

// create unique booking ID
export const uniqueBookingId = () => {
  const numberOfChars = 5
  const letters = "ABCDEFGHJKMNPQRSTUXY";
  let result = "";
  while (result.length < numberOfChars) {
    const randInt = Math.floor((Math.random() * 19) + 1);
    const randChr= letters[randInt];
    if (result.substr(-1, 1)!== randChr) result += randChr;
  }
  return (result);
}
