/*
 * Profile component Messages
 *
 * This contains all the text for the Profile component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'muuvz.component.Profile';

export default defineMessages({
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  thankYouHeader: {
    id: `${scope}.thankYouHeader`,
    defaultMessage: 'Thank you for choosing MUUVZ',
  },
  thankYouMessage: {
    id: `${scope}.thankYouMessage`,
    defaultMessage: 'Now complete your profile to start using MUUVZ services',
  },
  profileHeader: {
    id: `${scope}.profileHeader`,
    defaultMessage: 'Your info',
  },
  requiredField: {
    id: "muuvz.component.Form.requiredField",
    defaultMessage: 'This field is required',
  },
  fullName: {
    id: `${scope}.fullName`,
    defaultMessage: 'Fullname',
  },
  required: {
    id: "muuvz.component.Form.required",
    defaultMessage: 'Required',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  licenseType: {
    id: `${scope}.licenseType`,
    defaultMessage: 'License types',
  },
  profilePicture: {
    id: `${scope}.profilePicture`,
    defaultMessage: 'Profile picture',
  },
  optional: {
    id: "muuvz.component.Form.optional",
    defaultMessage: 'Optional',
  },
  saveProfile: {
    id: `${scope}.saveProfile`,
    defaultMessage: 'Save profile',
  },
  updateProfile: {
    id: `${scope}.updateProfile`,
    defaultMessage: 'Update profile',
  },
});
