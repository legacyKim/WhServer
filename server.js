const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/process.env') });

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// const { WriteListData } = require('./models/WriteListSchema');

app.use(express.json());

var cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'Whelper/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(res => console.log('mongo db connect'))
  .catch(err => console.log(err));

const modelWriteList = new mongoose.Schema({
  title: String,
  subTitle: String,
  content: String,
});

const modelMemoList = new mongoose.Schema({
  memo: String,
});

const WriteListData = mongoose.model('WriteList', modelWriteList);
const memoListData = mongoose.model('MemoList', modelMemoList);

app.get('/api/Write', (req, res) => {
  WriteListData.find({}, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      res.json(docs);
    }
  });
})

app.get('/api/Memo', (req, res) => {
  memoListData.find({}, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      res.json(docs);
    }
  });
})

app.listen(3000, () => {
  console.log("Express server started 3000")
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
});
