const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');

const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

// --- PEERSERVER CONFIGURATION ---
// We are telling PeerServer to live at the root path '/'
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/' // Use the root path
});

// --- EXPRESS ROUTING ---
// Mount the peerServer at the root.
app.use('/', peerServer);

// We can add a "connection" event listener
// to see if people are *really* connecting.
peerServer.on('connection', (client) => {
  console.log('PeerJS: A client has connected with ID:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('PeerJS: A client has disconnected with ID:', client.getId());
});

// --- Start The Server ---
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`PeerJS is listening ON /`);
});