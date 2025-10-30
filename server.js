const { PeerServer } = require('peer');

// This is the critical fix:
// Render provides a port in 'process.env.PORT'
// We use 9000 only as a backup for local testing.
const port = process.env.PORT || 9000;

const peerServer = PeerServer({
  port: port, // Use the correct port
  path: '/myapp'
});

// This log will now show the *correct* port (like 10000)
console.log(`PeerServer running on port ${port}`);