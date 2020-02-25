const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  surname: String,
  titles: Number
});

module.exports = mongoose.model('Author', authorSchema);