const express = require('express');
const mongoose = require('mongoose');
const collections = require('./routes/collections');
const login = require('./routes/login');
const create = require('./routes/create');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app = express();

//socket stuff
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const socketIO = io.listen(server);
const socketManager = require('./socketManager');
//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, './client/public')));
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
//socket.io stuff
module.exports.io = io;
io.on('connection', socketManager);

server.listen(port, () => console.log(`app server running on port ${port}`));

// io.on('connection', user => {
//   console.log('new user connected..');

//   user.on('refreshCall', data => {
//     //first try. emiting this on each main collection container component didmount to distri redux state and to rerender
//     const { data: newdata, msg } = data;
//     io.emit('refreshList', { newdata, msg });
//   });
//   user.on('refreshCallServer', data => {
//     //first try. emiting this on each main collection container component didmount to distri redux state and to rerender
//     const { data: newdata, msg } = data;
//     io.emit('refreshList', { newdata, msg });
//   });
//   user.on('disconnect', () => {
//     console.log(`user disconnected`);
//   });
// });
