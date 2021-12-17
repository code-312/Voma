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
const {
  getProjects,
  getProject, 
  addProject,
  editProject,
  removeProject
} = require('./db/controllers/projects');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

/* ____________ Begin API Endpoints ____________ */

// Put all API endpoints under '/api'

/*========= VOLUNTEER ROUTES =========*/
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

/*========= PROJECT ROUTES =========*/

/* Return all projects */
app.get('/api/projects', getProjects);

/* Add new project */
app.post('/api/project', addProject);

/* Get a specific project */
app.get('/api/project/:id', getProject);

/* Edit a project */
app.post('/api/project/:id', editProject);

/* Remove a project */
app.delete('/api/project/:id', removeProject);

/* ____________ End API Endpoints ____________ */

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Voma server listening on ${port}`);