const express = require('express');
const mongoose = require('mongoose');
const collections = require('./routes/collections');
const login = require('./routes/login');
const create = require('./routes/create');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
//PASSPORT CONFIG
require('./config/passport')(passport);
const db = require('./config/key_dist').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(console.log('DB connected'))
  .catch(e => console.log(e));

app.use('/login', login);
app.use('/create', create);
app.use('/collections', collections);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
