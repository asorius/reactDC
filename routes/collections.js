const express = require('express');
const router = express.Router();
const Collection = require('../modules/Collection');
const passport = require('passport');
const validateAdditionInput = require('../validation/addition');
const moment = require('moment');
const idGenerator = require('../generators/idGenerator');
//GET COLLECTION ../collections/get
router.get(
  '/get',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id, userType } = req.user;
      const { data, name, sum } = await Collection.findOne({ _id: id });

      res.json({ data, name, userType, sum });
    } catch (e) {
      res.json(e);
    }
  }
);
//ADD NEW DATA ../collections/add
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id, userType } = req.user;
      const date = moment().format('MMM Do YYYY, h:mm a');
      const _id = idGenerator();
      const { errors, isValid } = validateAdditionInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      req.body.amount = parseFloat(req.body.amount).toFixed(2);
      const input = { ...req.body, date, _id };

      const updatedCollection = await Collection.findByIdAndUpdate(
        id,
        { $push: { data: { ...input } } },
        { new: true }
      );
      await updatedCollection.save();
      const { data, name, sum } = updatedCollection;

      res.json({ data, name, userType, sum });
    } catch (error) {
      res.json({ error });
    }
  }
);
//DELETE SINGLE ../collections/delete/data/12431541523
router.delete(
  '/delete/data/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id, userType } = req.user;
      const deletionId = req.params.id;
      const updatedCollection = await Collection.findByIdAndUpdate(
        id,
        { $pull: { data: { _id: deletionId } } },
        { new: true }
      );
      await updatedCollection.save();
      const { data, name, sum } = updatedCollection;
      res.json({ data, name, userType, sum });
    } catch (error) {
      res.json({ error });
    }
  }
);

//EDIT SINGLE ../collections/edit
router.patch(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const editId = req.params.id;
      const { id, userType } = req.user;
      const date = moment().format('MMM Do YYYY, h:mm a');
      const { errors, isValid } = validateAdditionInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      req.body.amount = parseFloat(req.body.amount).toFixed(2);
      const input = { ...req.body, date, _id: editId };

      const updatedCollection = await Collection.findOneAndUpdate(
        { _id: id, 'data._id': editId },
        { $set: { 'data.$': { ...input } } },
        { new: true }
      );
      await updatedCollection.save();
      const { data, name, sum } = updatedCollection;
      res.json({ data, name, userType, sum });
    } catch (error) {
      res.json({ error });
    }
  }
);

//DELETE ALL DATA ITEMS ../collections/delete/data
router.delete(
  '/delete/data',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id, userType } = req.user;
      const updatedCollection = await Collection.findByIdAndUpdate(
        id,
        { data: [] },
        { new: true }
      );
      await updatedCollection.save();
      const { data, name, sum } = updatedCollection;
      res.json({ data, name, userType, sum });
    } catch (error) {
      res.status(400).send({ deleted: false, error });
    }
  }
);
//DELETE COLLECTION ../collections/delete
router.delete(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.user;
      const collection = await Collection.findByIdAndRemove(id);
      if (collection) {
        res.json({ deleted: true });
      } else {
        res.json({ deleted: false, error: 'idk' });
      }
    } catch (e) {
      res.status(400).send({ deleted: false, e });
    }
  }
);

module.exports = router;
