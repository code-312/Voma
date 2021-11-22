require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}`});
const express = require('express');
const path = require('path');
const { models } = require('./db');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Put all API endpoints under '/api'
app.get('/api/test', async (req, res) => {
  //  const result = await getUsers();
    const result = test();
    res.send(JSON.stringify(result));
});

app.get('/api/addUser', async (req, res) => {
  try {
    await models.volunteer.create({
      name: "Will Bray",
      email: "wabray17@gmail.com"
    });
    res.send("Success!");
  } catch (err) {
    res.send(`Uh oh.... ${err}`);
  }
});

app.get('/api/getUsers', async (req, res) => {
    try {
      const volunteers = await models.volunteer.findAll();
      res.send(JSON.stringify(volunteers));
    } catch (err) {
      res.send("Err!");
    }
});
  
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Voma server listening on ${port}`);