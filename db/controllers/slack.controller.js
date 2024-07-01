const slack = require('../lib/slack/slack');
const blocks = require('../lib/slack/blocks');
const { models } = require('../index');
const { getAdminEmails } = require('./admins.controller');
const axios = require('axios');

const responses = {
  /**
   * Responds to submission from projectWelcomeConfirm.
   * lib/slack/blocks.js - messageBlocks.projectWelcomeConfirm.
   */
  projectWelcomeConfirm: {
    respond: async (action, request) => {
      const answer = action?.selected_option?.value || null;
      const channelId = request?.channel?.id || null;
      const ts = request?.message?.ts || null;

      let messageParams, result;

      // todo: fill in these variables later.

      switch (answer) {
        case 'yes':
          // todo: Update the database with the response?
          await slack.slackTextMessageUser(
            'PROJECT_ADMIN_SLACK_ID',
            `PROJECT_NAME: VOLUNTEER_NAME has accepted and conditionally joined!`,
          );
          messageParams = {
            name: 'PROJECT_NAME',
            links: [
              {
                label: 'Google Drive',
                url: 'https://google.link',
              },
              {
                label: 'Trello',
                url: 'https://trello.link',
              },
            ],
          };
          result = slack.slackBlockUpdateChat(
            channelId,
            ts,
            'projectWelcomeConfirmYes',
            messageParams,
          ); // Block contents in lib/slack/blocks
          break;

        case 'no':
          // todo: Update the database with the response?
          await slack.slackTextMessageUser(
            'PROJECT_ADMIN_SLACK_ID',
            `PROJECT_NAME: VOLUNTEER_NAME has rejected the invite and has been prompted to schedule a 1:1 with you.`,
          );
          messageParams = 'SCHEDULE_FOLLOWUP_MEETING_URL';
          result = slack.slackBlockUpdateChat(
            channelId,
            ts,
            'projectWelcomeConfirmNo',
            messageParams,
          ); // Block contents in lib/slack/blocks
          break;

        default:
          break;
      }

      // Display the next screen in the chat flow.
      result = await slack.slackBlockUpdateChat(channelId, ts, responseBlock);

      return result;
    },
  },
};

/**
 * Slack hooks hit this endpoint. There's only one endpoint so this function needs
 * to handle processing for all the hooks/actions.
 */
const slackBot = async (req, res) => {
  if (!req?.body?.payload) {
    res
      .json({
        message: 'Slack hook triggered with no payload.',
        request: req?.body,
      })
      .end();
    return;
  }

  const data = JSON.parse(req.body.payload);

  let action_id, result;
  switch (data?.type) {
    case 'block_actions': // Handle 'Block Actions'.
      for (let i = 0; i < data.actions?.length; i++) {
        // Use the action_id set in the fields to find the right response function.
        action_id = data.actions[i].action_id;
        if (responses[action_id]) {
          result = await responses[action_id].respond(data.actions[i], data);
        }
      }
      break;

    default:
      break;
  }

  // console.debug('slack.controller - slackBot - action_id', action_id);
  // console.debug('slack.controller - slackBot - result', result);
};

const sendTaskCheckboxes = async (volunteer) => {
  await slack
    .slackBlockMessageUser(volunteer.slackUserId, 'volunteerTasks', volunteer)
    .catch((err) => err);
};

const sendProjectWelcomeToVolunteer = async (req, res) => {
  let error;
  const { slackId, project } = req.body;
  const parsedProject = JSON.parse(project);
  const blockName = 'projectWelcomeConfirm';

  const result1 = await slack
    .slackBlockMessageUser(slackId, blockName, parsedProject)
    .catch((err) => (error = err));

  const result2 = await slack
    .slackBlockMessageUser(slackId, 'projectWelcomeActionButons')
    .catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ result: 'Success!' });
};

const getSlackIds = async () => {
  // We may want to add slack ids to the admin model in the future, instead of doing it this way.
  const emails = await getAdminEmails();
  const slackIds = [];
  await Promise.all(
    emails.map(async (email) => {
      const response = await slack.slackLookupByEmail(email.email);
      if (response.data.ok) {
        slackIds.push(response.data.user.id);
        return response.data.user.id;
      }
    }),
  );

  return slackIds;
};

const notifyAdminsYes = async (volunteer, project) => {
  const slackIds = await getSlackIds();
  slackIds.forEach((id) => {
    slack.slackBlockMessageUser(id, 'notifyAdminConfirm', { volunteer, project });
  });
};

const notifyAdminsNo = async (volunteer, project) => {
  const slackIds = await getSlackIds();
  slackIds.forEach((id) => {
    slack.slackBlockMessageUser(id, 'notifyAdminDecline', { volunteer, project });
  });
};

const notifyAdminsTasksComplete = async (name) => {
  const slackIds = await getSlackIds();
  slackIds.forEach((id) => {
    slack.slackBlockMessageUser(id, 'tasksCompleteAdmin', name);
  });
};

const receiveUserResponse = async (req, res) => {
  const actionMap = {
    projectWelcomeConfirm: acceptOrRejectProject,
    task_complete: updateUserTasks,
  };

  const { payload } = req.body;
  const parsedPayload = JSON.parse(payload);
  const action = parsedPayload?.actions?.[0]?.action_id;
  if (action) {
    actionMap[action](parsedPayload);
  }

  return res.sendStatus(200);
};

const acceptOrRejectProject = async (parsedPayload) => {
  const response = parsedPayload?.actions?.[0]?.selected_option?.value;
  const responseUrl = parsedPayload?.response_url;
  const user = parsedPayload?.user?.id;

  const volunteer = await models.volunteer.findOne({
    where: { slackUserId: user },
    include: [
      {
        model: models.project,
        include: [
          {
            model: models.Link,
          },
        ],
      },
    ],
  });

  const originalProject = volunteer.project;
  if (response === 'yes') {
    slack.acknowledge(responseUrl, blocks.messageBlocks.projectActionReplaceYes());
    slack.sendProjectDetails(user, volunteer.project);
    notifyAdminsYes(volunteer.name, originalProject.name);
  } else if (response === 'no') {
    slack.acknowledge(responseUrl, blocks.messageBlocks.projectActionReplaceNo());
    slack.handleNoAction(user);
    notifyAdminsNo(volunteer.name, originalProject.name);

    await volunteer.setProject(null).catch((err) => console.log(err));
  }

  return true;
};

const updateUserTasks = async (parsedPayload) => {
  const response = parsedPayload?.actions?.[0]?.selected_options;
  const responseUrl = parsedPayload?.response_url;
  const user = parsedPayload?.user?.id;
  // TODO: figure out way to add completed date
  if (response) {
    const completedTasks = response.map((item) => item?.text?.text);

    const result = await models.volunteer.update(
      { completedTasks },
      {
        where: {
          slackUserId: user,
        },
        returning: true,
        plain: true,
      },
    );

    if (result) {
      // on success, update will return an array with two elements; the number of rows affected
      // and (if you include returning and plain in the request) the object affected.
      const updatedVolunteer = result[1]?.name;
      if (completedTasks.length === 3) {
        slack.slackBlockMessageUser(user, 'tasksCompleteVolunteer', null);
        if (updatedVolunteer) {
          notifyAdminsTasksComplete(updatedVolunteer);
        }
      }
    }
  }
};

module.exports = {
  slackBot,
  sendProjectWelcomeToVolunteer,
  receiveUserResponse,
  notifyAdminsYes,
  sendTaskCheckboxes,
};
