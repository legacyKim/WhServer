const mongoose = require('mongoose');

const modelWriteList = new mongoose.Schema({
  title: String,
  subTitle: String,
  content: String,
});

const WriteListSchema = mongoose.model('WriteList', modelWriteList);

module.exports = WriteListSchema;