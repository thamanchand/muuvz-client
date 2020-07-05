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

});
