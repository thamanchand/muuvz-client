/*
 * Sidebar component Messages
 *
 * This contains all the text for the Sidebar component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'muuvz.component.Sidebar';

export default defineMessages({
  booking: {
    id: `${scope}.booking`,
    defaultMessage: 'Booking',
  },
  vans: {
    id: `${scope}.vans`,
    defaultMessage: 'Vans',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  account: {
    id: `${scope}.account`,
    defaultMessage: 'Account',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
});
