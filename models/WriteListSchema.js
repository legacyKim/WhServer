const mongoose = require('mongoose');

const modelWriteList = new mongoose.Schema({
  title: String,
  subTitle: String,
  content: String,
  writeDate: { type: Date, required: true, default: () => Date.now() + 3*60*1000 }
});

const WriteListSchema = mongoose.model('WriteList', modelWriteList);

module.exports = WriteListSchema;