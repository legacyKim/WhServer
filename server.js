const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const app = express();

const url = "mongodb+srv://arbam486:93Whelper486@whelper.r0x6ync.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
var cors = require('cors');
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(res => console.log('mongo db connect'))
  .catch(err => console.log(err));

app.listen(8080, () => {
  console.log("Express server started");
});

// bulid 

app.use(express.static(path.join(__dirname, 'Whelper/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
})

// bulid 

/*

app.get('/components/Memo', function (req, res) {
  res.json();
})

*/

// checking for router... but working it is not...

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
})