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
  //Passwords hashing
  const salt = await bcrypt.genSalt(10);
  const adminHashed = await bcrypt.hash(password_admin, salt);
  const normalHashed = await bcrypt.hash(password, salt);

  //Create new collection instance
  const newCollection = new Collection({
    name,
    password: normalHashed,
    password_admin: adminHashed
  });

  try {
    await newCollection.save();
    //Generate token with user type and collection id in it
    const token = await jwtGenerator({
      userType: 'admin',
      id: newCollection._id
    });
    res.json({ token, userType: 'admin' });
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
