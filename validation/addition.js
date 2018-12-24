const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAdditionInput(data) {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? data.amount : '';
  data.details = !isEmpty(data.details) ? data.details : '';

  if (!Validator.isLength(data.details, { min: 2, max: 20 })) {
    errors.details = 'Keep it 2 to 20 characters';
  }

  if (Validator.isEmpty(data.details)) {
    errors.details = 'Details field is required';
  }
  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field is required';
  }
  if (!Validator.isNumeric(data.amount, { no_symbols: false })) {
    errors.amount = 'Only numeric values';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
