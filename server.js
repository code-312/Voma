require('dotenv').config({ 
  path: `./.env.${process.env.NODE_ENV}`
});
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const volunteerController = require('./db/controllers/volunteers.controller');
const projectController = require('./db/controllers/projects.controller');
const skillsController = require('./db/controllers/skills.controller');
const userController = require('./db/controllers/users.controller');
const adminController = require('./db/controllers/admins.controller');

const app = express();
app.use(cors({ origin: true })); // todo: Limit open cors to client routes.

app.use(express.urlencoded());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

/* ____________ Begin API Endpoints ____________ */

// Put all API endpoints under '/api'

app.post('/api/user/find', userController.findUser);

/*========= VOLUNTEER ROUTES =========*/
app.get('/api/volunteers', volunteerController.getVolunteers);
app.post('/api/volunteer/create', volunteerController.addVolunteer);
app.get('/api/volunteer/:id', volunteerController.getVolunteer);
app.put('/api/volunteer/:id', volunteerController.editVolunteer);
app.delete('/api/volunteer/:id', volunteerController.removeVolunteer);
app.post('/api/volunteer/slack/exists', volunteerController.validateVolunteerSlack);


/*========= SKILL ROUTES =========*/
app.get('/api/skills', skillsController.getSkills);
app.get('/api/skill/:id', skillsController.getSkill);
app.post('/api/skill', skillsController.addSkill)
app.put('/api/skill/:id', skillsController.editSkill)
app.delete('/api/skill/:id', skillsController.removeSkill)

/*========= PROJECT ROUTES =========*/
app.get('/api/projects', projectController.getProjects);
app.post('/api/project', projectController.addProject);
app.get('/api/project/:id', projectController.getProject);
app.put('/api/project/:id', projectController.editProject);
app.delete('/api/project/:id', projectController.removeProject);

/*========= ADMIN ROUTES =========*/
app.post('/api/admin', adminController.addAdmin);
app.get('/api/admin/:id', adminController.getAdmin);

/*========= AUTHENTICATION ROUTES =========*/
app.post('/api/login', adminController.login);

// 404 error
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

// 500 error
app.use(function(err, req, res, next) {
  return res.status(500).send({ error: err });
});

/* ____________ End API Endpoints ____________ */

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Voma server listening on ${port}`);