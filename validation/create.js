const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.password_admin = !isEmpty(data.password_admin)
    ? data.password_admin
    : '';
  data.password_admin2 = !isEmpty(data.password_admin2)
    ? data.password_admin2
    : '';

  if (!Validator.isLength(data.name, { min: 2, max: 10 })) {
    errors.name = 'Name must be between 2 and 10 characters';
  }
  //check for name requirement
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  //check USER password requirements
  // if (!Validator.isLength(data.password, { min: 5, max: 15 })) {
  //   errors.password = 'Password must be at least 5 characters';
  // }
  // if (Validator.isEmpty(data.password)) {
  //   errors.password = 'Password field is required';
  // }
  //
  //check USER password confirmation

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  // if (Validator.isEmpty(data.password2)) {
  //   errors.password2 = 'Confirmation field is required';
  // }
  //

  //ADMIN password validation
  if (!Validator.isLength(data.password_admin, { min: 5, max: 15 })) {
    errors.password_admin = 'Password must be at least 5 characters';
  }

  if (Validator.equals(data.password, data.password_admin)) {
    errors.password_admin = 'Passwords must not match';
  }
  if (Validator.isEmpty(data.password_admin)) {
    errors.password_admin = 'Admin Password field is required';
  }
  //
  //ADMIN password confirmation
  if (Validator.isEmpty(data.password_admin2)) {
    errors.password_admin2 = 'Confirmation field is required';
  }
  if (!Validator.equals(data.password_admin, data.password_admin2)) {
    errors.password_admin2 = 'Admin passwords must match';
  }

  //
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
