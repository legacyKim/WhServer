const mongoose = require('mongoose');

const modelWriteList = new mongoose.Schema({
  id: Number,
  이름: String,
  나이: Number
});

const WriteListData = mongoose.model('WriteList', modelWriteList);

module.exports = WriteListData;