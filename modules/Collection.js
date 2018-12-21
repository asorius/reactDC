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
    type: Number,
    default: 0
  },
  data: []
});

collectionSchema.pre('save', function(next) {
  const collection = this;
  const initialValue = 0;
  const allSum = collection.data.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.amount);
  }, initialValue);
  collection.sum = allSum;
  next();
});
module.exports = Collection = mongoose.model('collection', collectionSchema);
