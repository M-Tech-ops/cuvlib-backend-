const { PeerServer } = require('peer');

// This is the important change:
// Render tells our app which port to use via process.env.PORT
// We use 9000 as a fallback *only* if we're running it locally.
const port = process.env.PORT || 9000;

const peerServer = PeerServer({
  port: port, // Use the dynamic port from Render
  path: '/myapp'
});

// Update the log message to show the *actual* port
console.log(`PeerServer running on port ${port}`);