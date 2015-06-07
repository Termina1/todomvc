var express = require('express');
var parser = require('body-parser');
var app = express();


var storage = [];
app.use(express.static('.'));
app.use(parser.json());


app.get('/get', function(req, res) {
  res.json(storage);
});

app.post('/set', function(req, res) {
  storage = req.body;
  res.json(storage);
});

app.listen(3000);
