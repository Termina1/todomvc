var API_KEY = 'AIzaSyC8rmKbHfxDbqyS7kfdYyKNtstIKBBDrB8';
var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

var express = require('express');
var parser = require('body-parser');
var app = express();
var request = require('request');

var storage = [];
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


app.get('/notify', function(req, res) {
  setTimeout(function() {
    request({
      uri: GCM_ENDPOINT,
      headers: {
        "Authorization": "key=" + API_KEY
      },
      method: 'POST',
      json: { registration_ids: [req.query.subId] }
    }, function(err, resp) {
      console.log(err, resp.body);
    })
  }, 5000);
  res.json({ok: true});
})


app.listen(3000);
