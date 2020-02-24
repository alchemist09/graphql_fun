const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  titles: Number
});

module.exports = new mongoose.Model('Author', authorSchema);