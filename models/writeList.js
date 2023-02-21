const mongoose = require('mongoose');

const schemaWriteList = new mongoose.Schema({
    id: Number,
    이름: String,
    나이: Number
  });

  const WriteList = mongoose.model('WriteList', schemaWriteList);

  module.exports = WriteList;
  
  WriteList.findById('63edf4f7d44ad2ecb1b4ba59',(err, data) => {
    if (err) throw err;
    console.log(data);
  });