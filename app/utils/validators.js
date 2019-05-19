import isEmail from 'validator/lib/isEmail'

// Function for combining validators
export const composeValidators = (...validators) => (...validatorParams) =>
  validators.reduce(
    (error, validator) => error || validator(...validatorParams),
    undefined
  )

export const validateAbove18 = val =>
  !Number.isNaN(val) && val > 18 ? undefined : 'No kids allowed.'

export const validateEmail = (
  msg = 'Please enter a valid email address.'
) => value => (isEmail(value) ? undefined : msg)

export const validateIsNumber = (msg = 'Must be a number.') => value =>
  Number.isNaN(value) ? msg : undefined

export const validateIsThree = val =>
  val === 'three' ? undefined : 'You should select option three!'

export const validateMatch = (fieldName, msg) => (value, allValues) =>
  value !== allValues[fieldName] ? msg : undefined

export const validateMaxLength = (
  maxLength,
  msg = `Must be maximum of ${maxLength}.`
) => val => (val.length > maxLength ? msg : undefined)

export const validateMinLength = (
  minLength,
  msg = `Must be minimum of ${minLength}.`
) => val => (val.length < minLength ? msg : undefined)

export const validateRequired = (msg = 'Required.') => value =>
  // check against length because unfilled checkboxes produces empty array
  value && value.length !== 0 ? undefined : msg
