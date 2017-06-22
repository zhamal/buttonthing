const express = require('express');
const ring = require('./ring');
const server = express();

// Grab port settings
const port = process.env.PORT || 3000;

server.post('/ring', (req, res) => {
  const appleId = ring();
  res.end('If you see this, all of your devices devices are probably ringing right now');
});

server.listen(port, () => {
  console.log('Listening at ' + port)
  console.log('Send a POST call to /ring to ring devices');
})