import React, { useRef, useEffect } from 'react';
import moment from 'moment';

export const formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

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

// filter current bookings from resourceList
export const filterBusinessCurrentBookings = (bookingList, userId) => {
  const currentDate = new Date();
  return bookingList.filter((item) =>
    new Date(item.bookedStartDateTime).getTime() > currentDate
    && item.resource && item.resource.user === userId
  );
}

// filter current bookings of the customer from resourceList
export const filterCustomerCurrentBookings = (bookingList, userId) => {
  const currentDate = new Date();
  return bookingList.filter((item) =>
    new Date(item.bookedStartDateTime).getTime() > currentDate
    && item.resource && item.user.id === userId
  );
}

// filter resources belongs to User
export const filterResourcesBelongsToUser = (resourceList, userId) =>
  resourceList.filter((item) => item.user && item.user.id === userId)

// filter only available resources
export const filterAvailableResources = (resourceList) =>
  resourceList.filter((item) => item.status === 'Available')


export function useMedia(query) {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

// compare difference between two array objects
export const compareObjectDiff = (currentList, previousList) => previousList && previousList.filter(prev => !currentList.some(current => prev.perhrdayweek === current.perhrdayweek && prev.unit === current.unit && prev.price === current.price))

// Hook
export const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
