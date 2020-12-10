import { compose, composeValidators, mainValidation } from './utils'
import email from './email'
import required from './required'
import min from './min'
import max from './max'

export function validateEmail(fields) {
  return mainValidation(fields, email)
}

export function validateRequired(fields) {
  return mainValidation(fields, required)
}

export function validateMin(fields, value) {
  return mainValidation(fields, min(value))
}

export function validateMax(fields, value) {
  return mainValidation(fields, max(value))
}

export {
  compose,
  composeValidators,
  email,
  required,
  min,
  max,
}
