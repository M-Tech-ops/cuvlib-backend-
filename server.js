const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');

const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

// --- NEW PEERSERVER CONFIGURATION ---

// We are telling ExpressPeerServer to *only* listen
// for requests that come to the '/myapp' path.
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/myapp' // This MUST match your client's path
});

// --- NEW EXPRESS CONNECTION ---

// Instead of mounting at '/myapp', we mount the peerServer
// at the root ('/'). The peerServer itself will now
// handle filtering for the '/myapp' path.
app.use('/', peerServer);

// Simple "hello world" route to check if the server is alive
app.get('/', (req, res) => {
  res.send('Your EduSync backend is running! PeerJS is active on the /myapp path.');
});

// --- Start The Server ---
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`PeerJS is listening for requests on /myapp`);
});