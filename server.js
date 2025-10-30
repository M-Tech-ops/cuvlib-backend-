const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');

const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

// --- PEERSERVER CONFIGURATION ---
// Notice the 'path' option is GONE.
// We let Express handle the path.
const peerServer = ExpressPeerServer(server, {
  debug: true
});

// --- EXPRESS ROUTING ---
// THIS IS THE KEY: We are telling Express to mount
// the peerServer *directly* at the '/myapp' path.
// This is the cleanest way to do it.
app.use('/myapp', peerServer);

// Simple "hello world" route to check if the server is alive
app.get('/', (req, res) => {
  res.send('Your EduSync backend is running! PeerJS is active on the /myapp path.');
});

// --- Start The Server ---
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`PeerJS is listening ON /myapp`);
});