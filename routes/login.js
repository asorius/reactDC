const express = require('express');
const router = express.Router();
const Collection = require('../modules/Collection');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../generators/jwtGenerator');
const validateLoginInput = require('../validation/login');

//LOGIN ../login
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const collection = await Collection.findOne({ name });
  if (!collection) {
    return res.status(400).json({ error: 'Name or password incorrect' });
  }

  let normal;
  if (collection.password) {
    normal = await bcrypt.compare(password, collection.password);
  } else {
    normal = false;
  }
  const admin = await bcrypt.compare(password, collection.password_admin);
  if (normal) {
    const token = await jwtGenerator({ userType: 'user', id: collection._id });
    return res.json({ token, userType: 'user' });
  }
  if (admin) {
    const token = await jwtGenerator({ userType: 'admin', id: collection._id });
    return res.json({ token, userType: 'admin' });
  } else {
    return res.status(400).json({ error: 'Name or password incorrect' });
  }
});
module.exports = router;
