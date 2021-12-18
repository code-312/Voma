require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}`});
const express = require('express');
const path = require('path');
const {
  getVolunteers,
  getVolunteer,
  addVolunteer,
  editVolunteer,
  removeVolunteer
} = require('./db/controllers/volunteers');

const skillsController = require('./db/controllers/skills.controller');

const app = express();
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Put all API endpoints under '/api'

/* Return all volunteers */
app.get('/api/volunteers', getVolunteers);

/* Add new volunteer */
app.post('/api/volunteer', addVolunteer);

/* Get a specific volunteer */
app.get('/api/volunteer/:id', getVolunteer);

/* Edit a volunteer */
app.post('/api/volunteer/:id', editVolunteer);

/* Remove a volunteer */
app.delete('/api/volunteer/:id', removeVolunteer);

/* Skills routes */
app.get('/api/skills', skillsController.getSkills);
app.get('/api/skills/:id', skillsController.getSkill);
app.post('/api/skills', skillsController.addSkill)
app.put('/api/skills/:id', skillsController.editSkill)
app.delete('/api/skills/:id', skillsController.removeSkill)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Voma server listening on ${port}`);