const express = require('express');
const router = express.Router();
const Collection = require('../modules/Collection');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../generators/jwtGenerator');
const passport = require('passport');
const validateAdditionInput = require('../validation/addition');

//GET COLLECTION ../collection/
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { collectionName, type } = req.user;
      const { data } = await Collection.findOne({ name: collectionName });
      res.json({ data, collectionName, type });
    } catch (e) {
      res.json(e);
    }
  }
);
//ADD NEW DATA
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { collectionName, type } = req.user;
      const input = req.body;
      const { errors, isValid } = validateAdditionInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const updatedCollection = await Collection.findOneAndUpdate(
        { name: collectionName },
        { $push: { data: { ...input } } }
      );
      res.json({ updatedCollection });
    } catch (e) {
      res.json(e);
    }
  }
);
//DELETE SINGLE
//DELETE ALL DATA
//DELETE COLLECTION
module.exports = router;
