const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password_admin) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 5, max: 15 })) {
    errors.password = 'Password must be at least 5 characters';
  }

  if (Validator.isEmpty(data.password_admin)) {
    errors.password2 = 'Admin Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
