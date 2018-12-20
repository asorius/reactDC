const express = require('express');
const router = express.Router();
const Collection = require('../modules/Collection');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../generators/jwtGenerator');
const passport = require('passport');

//GET CURRENT USER ../collection/user
router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json(req.user);
  }
);
//ADD NEW DATA
//DELETE SINGLE
//DELETE ALL DATA
//DELETE COLLECTION
module.exports = router;
