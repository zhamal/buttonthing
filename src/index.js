const express = require('express');
const path = require('path');
const ring = require('./ring');
const server = express();

// Grab port settings (in case we want to host this on Heroku)
const port = process.env.PORT || 3000;

// Whenever someone sends a POST request to /ring
server.post('/ring', (req, res) => {
  const appleId = ring();
  res.end('If you see this, all of your devices devices are probably ringing right now');
});

// Serve index.html and friends
const publicDirectoryPath = path.resolve(__dirname, '../public');
server.use(express.static(publicDirectoryPath));

// Run the server
server.listen(port, () => {
  console.log('Server is listening at ' + port)
  console.log('Send a POST call to /ring to ring devices');
})