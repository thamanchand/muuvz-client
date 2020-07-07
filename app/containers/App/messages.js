/*
 * Profile component Messages
 *
 * This contains all the text for the Profile component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'muuvz.component.App';

export default defineMessages({
  dashboardbooking: {
    id: `${scope}.dashboardbooking`,
    defaultMessage: '/dashboard/booking',
  },
  dashboardresources: {
    id: `${scope}.dashboardresources`,
    defaultMessage: '/dashboard/resources',
  },
  dashboardprofile: {
    id: `${scope}.dashboardprofile`,
    defaultMessage: '/dashboard/profile',
  },
});
