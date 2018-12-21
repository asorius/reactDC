const express = require('express');
const router = express.Router();
const Collection = require('../modules/Collection');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../generators/jwtGenerator');
const validateCreateInput = require('../validation/create');

//REGISTRATION  ../create
router.post('/', async (req, res) => {
  const { name, password, password_admin } = req.body;
  const { errors, isValid } = validateCreateInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const collection = await Collection.findOne({ name: req.body.name });
  if (collection) {
    return res.status(400).json({ name: 'This name already exists' });
  }
  //Create new collection instance
  const newCollection = new Collection({
    name,
    password_admin,
    password
  });
  //Passwords hashing
  const salt = await bcrypt.genSalt(10);
  const adminHashed = await bcrypt.hash(newCollection.password_admin, salt);
  const normalHashed = await bcrypt.hash(newCollection.password, salt);
  newCollection.password = normalHashed;
  newCollection.password_admin = adminHashed;
  //Generate token with user type and collection name in it
  const token = await jwtGenerator('admin', newCollection.name);
  await newCollection.save();
  const { cname, cdata } = newCollection;
  res.json({ name: cname, data: cdata, token });
});

module.exports = router;
