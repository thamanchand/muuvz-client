/*
 * Booking component Messages
 *
 * This contains all the text for the Booking component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'muuvz.component.Booking';

export default defineMessages({
  booking: {
    id: `${scope}.booking`,
    defaultMessage: 'Booking',
  },
  currentBookings: {
    id: `${scope}.currentBookings`,
    defaultMessage: 'Current bookings',
  },
  noBookingYet: {
    id: `${scope}.noBookingYet`,
    defaultMessage: 'No booking yet!',
  },
  vans: {
    id: `${scope}.vans`,
    defaultMessage: 'Vans',
  },
  month: {
    id: `${scope}.month`,
    defaultMessage: 'Month',
  },
  week: {
    id: `${scope}.week`,
    defaultMessage: 'Week',
  },
  day: {
    id: `${scope}.day`,
    defaultMessage: 'Day',
  },
  today: {
    id: `${scope}.today`,
    defaultMessage: 'Today',
  },
  booked: {
    id: `${scope}.booked`,
    defaultMessage: 'BOOKED',
  },
  requested: {
    id: `${scope}.requested`,
    defaultMessage: 'REQUESTED',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'CANCEL',
  },
  accept: {
    id: `${scope}.accept`,
    defaultMessage: 'ACCEPT',
  },
  cancelled: {
    id: `${scope}.cancelled`,
    defaultMessage: 'CANCELLED',
  },
  waiting: {
    id: `${scope}.waiting`,
    defaultMessage: 'WAITING',
  },
  inuse: {
    id: `${scope}.inuse`,
    defaultMessage: 'IN-USE',
  },
});
