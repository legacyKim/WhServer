const mongoose = require('mongoose');

const modelMemoList = new mongoose.Schema({
  memo: String,
});

const MemoListSchema = mongoose.model('MemoList', modelMemoList);

module.exports = MemoListSchema;