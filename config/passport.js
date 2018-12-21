const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Collection = mongoose.model('collection');
const keys = require('../config/key_dist');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const { id, userType } = jwt_payload;
      Collection.findById(id)
        .then(collection => {
          if (collection) {
            const data = { type: userType, id };
            return done(null, data);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
