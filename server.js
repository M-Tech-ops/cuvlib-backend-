// NEW: Import Express and Node's built-in 'http'
const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');

// --- Standard Express Setup ---
const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

// --- PeerServer Configuration ---
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/', // The peer server will be at the root of the path we give it
});

// --- Connect PeerJS to Express ---
// We tell Express to use our peerServer on the '/myapp' path.
// This matches the 'path: /myapp' in your video.js file.
app.use('/myapp', peerServer);

// Simple "hello world" route to check if the server is alive
app.get('/', (req, res) => {
  res.send('Your EduSync backend is running! PeerJS is active on the /myapp path.');
});

// --- Start The Server ---
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`PeerJS is listening on /myapp`);
});