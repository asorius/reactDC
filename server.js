const express = require('express');
const mongoose = require('mongoose');
const collections = require('./routes/collections');
const login = require('./routes/login');
const create = require('./routes/create');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app = express();

//socket
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  socket.emit('connected', `msg from server ${socket.id}`);
});
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
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(console.log('DB connected'))
  .catch(e => console.log(e));

app.use('/login', login);
app.use('/create', create);
app.use('/collections', collections);

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`app server running on port ${port}`));
