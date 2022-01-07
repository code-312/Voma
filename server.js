require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}`});
const express = require('express');
const axios = require('axios');
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

const skillsController = require('./db/controllers/skills.controller');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

/* ____________ Begin API Endpoints ____________ */

// Put all API endpoints under '/api'

app.post('/api/findUser', (req, res) => {
  const { email } = req.body;
  // First, get a list of all users in the slack workspace
  const result = await axios.request({
    url: 'https://slack.com/api/users.list',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer xoxb-2437281123203-2449980177553-bgr59LlKgSJdjpGCO9j7sBVE'
    }
  });
  
});

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

/* Skills routes */
app.get('/api/skills', skillsController.getSkills);
app.get('/api/skills/:id', skillsController.getSkill);
app.post('/api/skills', skillsController.addSkill)
app.put('/api/skills/:id', skillsController.editSkill)
app.delete('/api/skills/:id', skillsController.removeSkill)

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