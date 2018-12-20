const jwt = require('jsonwebtoken');
const keys = require('../config/key_dist');

module.exports = async (userType, collectionName) => {
  const payload = { userType, collectionName };
  const key = keys.secretOrKey;
  const expiration = null;
  const token = await jwt.sign(payload, key, expiration);
  return 'Bearer ' + token;
};
