/*
 * Search componebt Messages
 *
 * This contains all the text for the Search component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'muuvz.component.VanListing';

export default defineMessages({
  searchPlace: {
    id: `${scope}.searchPlace`,
    defaultMessage: 'City',
  },
  searchPickupDate: {
    id: `${scope}.searchPickupDate`,
    defaultMessage: 'Pickup date',
  },
  searchPickupTime: {
    id: `${scope}.searchPickupTime`,
    defaultMessage: 'Pickup time',
  },
  searchDropOffDate: {
    id: `${scope}.searchDropOffDate`,
    defaultMessage: 'Drop-off date',
  },
  searchDropOffTime: {
    id: `${scope}.searchDropOffTime`,
    defaultMessage: 'Drop-off time',
  },
  selectDateTimeNotify: {
    id: `${scope}.selectDateTimeNotify`,
    defaultMessage: 'Please select both date and time',
  },
  lessThan2HrsNotify: {
    id: `${scope}.lessThan2HrsNotify`,
    defaultMessage: 'You can not book less than 2 hrs',
  },
  searchVansBtn: {
    id: `${scope}.searchVansBtn`,
    defaultMessage: 'Search vans',
  },
  editSearch: {
    id: `${scope}.editSearch`,
    defaultMessage: 'Edit search',
  },
});
