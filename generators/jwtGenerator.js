const jwt = require('jsonwebtoken');
const keys = require('../config/key_dist');

module.exports = async data => {
  const payload = { ...data };
  const key = keys.secretOrKey;
  const expiration = null;
  const token = await jwt.sign(payload, key, expiration);
  return 'Bearer ' + token;
};
