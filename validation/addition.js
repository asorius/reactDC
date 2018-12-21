const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAdditionInput(data) {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? data.amount : '';
  data.details = !isEmpty(data.details) ? data.details : '';

  if (!Validator.isLength(data.details, { min: 1, max: 20 })) {
    errors.details = 'Post must be between 1 and 20 characters';
  }

  if (Validator.isEmpty(data.details)) {
    errors.details = 'Details field is required';
  }
  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
