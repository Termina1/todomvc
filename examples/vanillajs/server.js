var API_KEY = 'AIzaSyA98YIW2kq0kMXs9ZTTTPrwRaFdTjEyHvo';
var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

var express = require('express');
var parser = require('body-parser');
var app = express();
var request = require('request');
var uniq = require('lodash.uniq');

var storage = [];
var clients = [];
app.use(express.static('./build'));
app.use('/node_modules', express.static('./node_modules/'));
app.use(parser.json());


app.get('/get', function(req, res) {
  res.json(storage);
});

app.post('/set', function(req, res) {
  storage = req.body;
  res.json(storage);
});

app.get('/register', function(req, res) {
  clients.push(req.query.subId);
  clients = uniq(clients);
  res.json({ok: true});
});

app.get('/notify', function(req, res) {
  setTimeout(function() {
    request({
      uri: GCM_ENDPOINT,
      headers: {
        "Authorization": "key=" + API_KEY
      },
      method: 'POST',
      json: { registration_ids: clients }
    }, function(err, resp) {
      console.log(err, resp.body);
    })
  }, 5000);
  res.json({ok: true});
})


app.listen(3000);
