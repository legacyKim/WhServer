const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'Whelper/build')))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
})

app.get('/WhiteList', function(req, res){
  res.json();
})

app.get('/MemoList', function(req, res){
  res.json(); 
})

// checking for router... but working it is not...

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'Whelper/build/index.html'));
})