  const mongoose = require('mongoose');

  const modelMemoList = new mongoose.Schema({
    memo: String,
    memoDate: { type: Date, required: true, default: () => Date.now() + 3*60*1000 }
  });

  const MemoListSchema = mongoose.model('MemoList', modelMemoList);

  module.exports = MemoListSchema;