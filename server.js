const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const app = express();

const { User } = require('./models/WriteListSchema.js');


app.use(express.json());
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

app.use(express.static(path.join(__dirname, 'Whelper/build')))

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(res => console.log('mongo db connect'))
  .catch(err => console.log(err));

app.listen(8080, () => {
  console.log("Express server started 8080");
});

// get and post

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
})

app.post('/', (res, req) => {

  const test = new User(req.body);

  test.save((err, doc) => {
    if(err) return res.json({success: false, err});
    return res.status(200).json({
      success: true 
    })
  });

});

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