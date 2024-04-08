require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV}`
});
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const axios = require('axios');
const path = require('path');
const volunteerController = require('./db/controllers/volunteers.controller');
const projectController = require('./db/controllers/projects.controller');
const skillsController = require('./db/controllers/skills.controller');
const userController = require('./db/controllers/users.controller');
const adminController = require('./db/controllers/admins.controller');
const linkController = require('./db/controllers/links.controller');
const slackController = require('./db/controllers/slack.controller');
const testSlack = require('./db/controllers/testSlack.controller');
const timeslotController = require('./db/controllers/timeslots.controller');
const eventController = require('./db/controllers/event.controller');

const app = express();
app.use(cors({ origin: true })); // todo: Limit open cors to client routes.

app.use(express.urlencoded());
app.use(express.json());

const secure_cookies = ([
  'production', // List of node environments to enable SSL cookies.
  'stage'
].includes( app.get('env') ));

// todo: enable secure cookie for production.
app.use(session({
  secret: process.env.SESSION_SECRET || 'insecure',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: secure_cookies } 
}));

/**
 * Remove "trust proxy" for environments that don't need/have one set up. This 
 * is required to set cookies in a proxied setup.
 */
app.set('trust proxy', 1); // Proxy envs.. 


/**
 * Validates a user is logged in before serving the route. Returns failed 
 * message if the request doesn't have the authentication required.
 * 
 * @param {*} req  - Request object.
 * @param {*} res  - Response object.
 * @param {*} next - Move to next processing function.
 */
const verifyAuth = (req, res, next) => {
  if (req.session?.isAuthenticated) {
    next();

  } else {
    res.json({
      error: true,
      authenticated: false
    })
    .end();
  }
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

/* ____________ Begin API Endpoints ____________ */

// Put all API endpoints under '/api'

app.post('/api/user/find', userController.findUser);

/*========= VOLUNTEER ROUTES =========*/
app.get('/api/volunteers', verifyAuth, volunteerController.getVolunteers);
app.post('/api/volunteer', volunteerController.addVolunteer);
app.get('/api/volunteer/:id', verifyAuth, volunteerController.getVolunteer);
app.put('/api/volunteer/:id', verifyAuth, volunteerController.editVolunteer);
app.delete('/api/volunteer/:id', verifyAuth, volunteerController.removeVolunteer);
app.post('/api/assign-volunteer', verifyAuth, volunteerController.assignVolunteerToProject);
// app.post('/api/mark-task-complete', volunteerController.addCompletedTask);

/*========= SLACK ROUTES =========*/
app.post('/api/volunteer/slack', volunteerController.getSlackByEmail);

/*========= SKILL ROUTES =========*/
app.get('/api/skills', skillsController.getSkills);
app.get('/api/skill/:id', skillsController.getSkill);
app.post('/api/skill', verifyAuth, skillsController.addSkill)
app.put('/api/skill/:id', verifyAuth, skillsController.editSkill)
app.delete('/api/skill/:id', verifyAuth, skillsController.removeSkill)

/*========= PROJECT ROUTES =========*/
app.get('/api/projects', projectController.getProjects);
app.post('/api/project', verifyAuth, projectController.addProject);
app.get('/api/projects/archive', verifyAuth, projectController.getArchivedProjects);
app.post('/api/project/archive/:id', verifyAuth, projectController.archiveProject);
app.post('/api/project/reactivate/:id', verifyAuth, projectController.reactivateProject);
app.get('/api/project/:id', projectController.getProject);
app.put('/api/project/:id', verifyAuth, projectController.editProject);
app.delete('/api/project/:id', verifyAuth, projectController.removeProject);


/*========= LINK ROUTES =========*/
app.post('/api/link', linkController.addLinkRest);
app.post('/api/link/:id', linkController.editLinkRest);
app.delete('/api/link/:id', linkController.removeLinkRest);

/*========= TIMESLOT ROUTES =========*/
app.post('/api/timeslot', timeslotController.addTimeslot);
app.post('/api/timeslot/:id', timeslotController.editTimeslotRest);
app.delete('/api/timeslot/:id', timeslotController.deleteTimeslotRest);

/*========= EVENT ROUTES =========*/
app.get('/api/events', eventController.getEvents);
app.post('/api/event', eventController.addEventRest);
app.post('/api/event/bulkUpdate', eventController.bulkUpdate)
app.post('/api/event/:id', eventController.editEvent);
app.delete('/api/event/bulk', eventController.bulkDelete);
app.delete('/api/event/:id', eventController.deleteEvent);


/*========= ADMIN ROUTES =========*/
app.post('/api/admin', adminController.addAdmin);
app.get('/api/admin/:id', verifyAuth, adminController.getAdmin);
app.post('/api/admin/edit', verifyAuth, adminController.editAdmin);
app.post('/api/admin/password', verifyAuth, adminController.changePassword);

/*========= AUTHENTICATION ROUTES =========*/
app.post('/api/login', adminController.login);
app.get('/api/logout', adminController.logout);
app.post('/api/authenticated', adminController.loginState);

/*===== SLACK BOT =====*/
app.post('/api/slack/send-welcome-message', verifyAuth, slackController.sendProjectWelcomeToVolunteer);
app.post('/api/slack/bot', slackController.slackBot);
// Sent from slack bot
app.post('/api/slack/user-response', slackController.receiveUserResponse)

// These endpoints are to test and debug Slack Bot functionality during development and with Nightwatch.
// Point ngrok at local port 5000 and add the NGROKURL/api/slack/bot endpoint to your slack bot config for debug messages.
// Only use with the TEST_SLACK_TOKEN set to the bot on the test workspace, do not test on CFC's Slack Workspace.
if (app.get('env')=='development.local' && process.env?.TEST_SLACK && process.env?.TEST_SLACK_TOKEN) {
  /**
    * @param {string} slackUserId - (GET) Slack ID of the recipient. 
    * @param {string} blockName   - (GET) Block name. Should be a method defined in lib/slack/blocks.js 
    * @param {array}  blockParams - (GET) (optional) Block params if needed. 
    */
  app.get('/test/slack/user/message/block', testSlack.send.messageUserBlock);

  /**
    * @param {string} slackUserId - (GET) Slack ID of the recipient. 
    * @param {string} message     - (GET) Text message. 
    */
  app.get('/test/slack/user/message/text', testSlack.send.messageUserText);

  /**
    * @param {string} channel     - (GET) Channel to post to (no hashtag), for example "voma".
    * @param {string} blockName   - (GET) Block name. Should be a method defined in lib/slack/blocks.js 
    * @param {array}  blockParams - (GET) (optional) Block params if needed. 
    */
  app.get('/test/slack/channel/message/block', testSlack.send.messageChannelBlock);

  /**
    * @param {string} channel - (GET) Channel to post to (no hashtag), for example "voma".
    * @param {string} message - (GET) Message to post to the channel.
    */
  app.get('/test/slack/channel/message/text', testSlack.send.messageChannelText);
}

/* ____________ End API Endpoints ____________ */

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// 404 error
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

// 500 error
app.use(function(err, req, res, next) {
  return res.status(500).send({ error: err });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Voma server listening on ${port}`);
