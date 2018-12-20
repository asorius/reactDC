const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password_admin: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sum: {
    type: String
  },
  data: {
    type: Array
  }
});
module.exports = Collection = mongoose.model('collection', collectionSchema);
