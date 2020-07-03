/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'muuvz.containers.HomePage';

export default defineMessages({
  headerSearchLabel: {
    id: `${scope}.headerSearchLabel`,
    defaultMessage: 'SEARCH',
  },
  headerCompareLabel: {
    id: `${scope}.headerCompareLabel`,
    defaultMessage: 'COMPARE',
  },
  headerBookLabel: {
    id: `${scope}.headerBookLabel`,
    defaultMessage: 'BOOK',
  },
  headerMovingVan: {
    id: `${scope}.headerMovingVan`,
    defaultMessage: 'MOVING VAN IN',
  },
  cityHelsinki: {
    id: `${scope}.cityHelsinki`,
    defaultMessage: 'HELSINKI',
  },
  cityEspoo: {
    id: `${scope}.cityEspoo`,
    defaultMessage: 'ESPOO',
  },
  cityVantaa: {
    id: `${scope}.cityVantaa`,
    defaultMessage: 'VANTAA',
  },
});
