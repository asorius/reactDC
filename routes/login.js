const express = require('express');
const router = express.Router();
const Collection = require('../modules/Collection');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../generators/jwtGenerator');

//LOGIN ../login
router.post('/', async (req, res) => {
  const { name, password } = req.body;

  const collection = await Collection.findOne({ name });
  if (!collection) {
    return res.status(400).json({ error: 'Name or password incorrect' });
  }

  const normal = await bcrypt.compare(password, collection.password);
  const admin = await bcrypt.compare(password, collection.password_admin);
  if (normal) {
    const token = await jwtGenerator('user', collection.name);
    //put token in local and send token back
    return res.json({ token });
  }
  if (admin) {
    const token = await jwtGenerator('admin', collection.name);
    //put token in local and send token back

    return res.json({ token });
  } else {
    return res.status(400).json({ error: 'Name or password incorrect' });
  }
});
module.exports = router;
