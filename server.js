const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/process.env') });

const express = require('express');
const app = express();

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

const apiRouter = require('./api/api');
app.use('/', apiRouter);

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(res => console.log('mongo db connect'))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Express server started 3000")
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
});
