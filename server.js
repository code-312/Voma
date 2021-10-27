const express = require('express');
const path = require('path');
const { getUsers } = require('./db/index');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Put all API endpoints under '/api'
app.get('/api/test', async (req, res) => {
   const result = await getUsers();
    res.send(JSON.stringify(result));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Voma server listening on ${port}`);