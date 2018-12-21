const express = require('express');
const router = express.Router();
const Collection = require('../modules/Collection');
const passport = require('passport');
const validateAdditionInput = require('../validation/addition');
const moment = require('moment');
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
      const { id } = req.user;
      const date = moment().format('MMM Do YYYY, h:mm:ss a');
      req.body.amount = parseFloat(req.body.amount).toFixed(2);
      const input = { ...req.body, date };
      const { errors, isValid } = validateAdditionInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const updatedCollection = await Collection.findByIdAndUpdate(
        id,
        { $push: { data: { ...input } } },
        { new: true }
      );
      await updatedCollection.save();
      res.json({ sum: updatedCollection.sum, data: updatedCollection.data });
    } catch (error) {
      res.json({ error });
    }
  }
);
//DELETE SINGLE
//DELETE ALL DATA
//DELETE COLLECTION
module.exports = router;
