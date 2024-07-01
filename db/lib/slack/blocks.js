/**
 * Slack message blocks.
 *
 * Slack has a GUI block editor: https://app.slack.com/block-kit-builder/
 * Note: The GUI gives you a malformed JSON string you need to take the top
 * level "blocks" key out. Properly formatted it should be [{},{},{}].
 */
const messageBlocks = {
  /**
   *
   * @param {object} volunteer - the volunteer object
   */
  volunteerTasks: (volunteer) => {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hi ${volunteer.name}, thank you for registering!`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: "You've been assigned three tasks on Trello. After completing one, please mark it as done by clicking the checkbox.",
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'checkboxes',
            action_id: 'task_complete',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Watch onboarding videos',
                },
                value: 'watched_video',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Submit passcode validation',
                },
                value: 'submitted_passcode',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Submit skills survey',
                },
                value: 'submitted_survey',
              },
            ],
          },
        ],
      },
    ];
  },
  /**
   *
   * Notification a volunteer receives when they check off all three task boxes.
   * @returns {array} = Slack block array of block objects
   */
  tasksCompleteVolunteer: () => {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Welcome to Code for Chicago as an official member! After we assess your background and preferences to determine the best fit for a project, you will receive a notification soon with more details to confirm the assignment.',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'In the meantime, checkout *#announcements* to stay tuned to important updates and events from Code for Chicago.',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Please reach out to your volunteer coordinator or send a message in *#volunteer-onboarding* with any questions or concerns.',
        },
      },
    ];
  },
  /**
   *
   * Notification an admin recieves when a volunteer checks off all three task boxes.
   *
   * @param {string} volunteer - the volunteer who finished the tasks.
   * @returns {array} - Slack block array of block options
   */
  tasksCompleteAdmin: (volunteer) => {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Onboarding complete: *${volunteer}* has completed the Trello tickets for initial onboarding and has officially joined as a Code for Chicago member. Please view the Recommendation tab in Voma to fit this volunteer to the right project.`,
        },
      },
    ];
  },
  /**
   * Welcome to project message block.
   *
   * @param {object} project - Object with project information for the welcome message.
   *  @param {string} project.name - Project name.
   *  @param {string} project.description - Summary of the project.
   *  @param {string} project.currentNeeds - Current project needs summary. "Front-end, UX Research, etc."
   *  @param {string} project.cadence - Meeting cadence. "Every other Monday..."
   *  @param {string} project.tech - Project technologies. "Wordpress, Figma, ..."
   *  @param {string} project.additionalInfo - Additional info blurb.
   *
   * @returns {array} - Slack block array of block objects.
   */
  projectWelcomeConfirm: (project) => {
    return [
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there 👋! We've determined that based on your preferences and experience, *${project.name}* would be the most fitting for you.`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Summary*: ${project.description}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Current Needs*: ${project.currentNeeds}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Meeting Cadence*: ${project.meetingCadence}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Tech*: ${project.tech}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${project.comment}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Would you like to join?',
        },
      },
    ];
  },

  projectWelcomeActionButons: () => {
    return [
      {
        type: 'actions',
        elements: [
          {
            type: 'radio_buttons',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Yes, I would like to join this project.',
                  emoji: true,
                },
                value: 'yes',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'No, I would not like to join this project.',
                  emoji: true,
                },
                value: 'no',
              },
            ],
            action_id: 'projectWelcomeConfirm',
          },
        ],
      },
    ];
  },

  projectActionReplaceYes: () => {
    return [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: ':white_check_mark: Yes, I would like to join this project.',
          emoji: true,
        },
      },
    ];
  },

  projectActionReplaceNo: () => {
    return [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: ':no_entry_sign: No, I would not like to join this project.',
          emoji: true,
        },
      },
    ];
  },

  /**
   * Welcome to project message block - User responds "No".
   * @param {string} - Schedule followup meeting link.
   * @returns {array} - Slack block array of block objects.
   */
  projectActionConfirmNo: (scheduleFollowupMeetingLink) => {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `It looks like you don't want to join. Please use <${scheduleFollowupMeetingLink}|this link> to schedule a 1:1 with the project admin.`,
        },
      },
    ];
  },

  /**
   * Welcome to the project message block - User responds "Yes".
   *
   * @param {object} project - Object with project information for the welcome message.
   *  @param {string} project.name - Project name
   *  @param {array}  project.links - Project links ie. [{label:'Google Drive', url: 'https://link.com'}, ...]
   * @returns {array} - Slack block array of block objects.
   */
  projectWelcomeConfirmYes: (project) => {
    const requiredLinks = project.Links.filter((link) => link.required);
    console.log(requiredLinks);
    let blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Thank you for your interest in joining ${project.name}. You will be assigned a Trello ticket shortly with details pertaining to the team and project which will need to be completed in order to officially join.`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Once you complete the ticket, please review and save the following project links. If applicable, join the channel, group, or board.',
        },
      },
      {
        type: 'divider',
      },
    ];

    for (let i = 0; i < requiredLinks.length; i++) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🔗 <${requiredLinks[i].url}|${requiredLinks[i].title}>`,
        },
      });
    }

    return blocks;
  },

  /**
   * Notifaction to an admin informing them that the volunteer accepted the project.
   *
   * @param {object} details - object containing name of the volunteer and name of project.
   * @returns {array} - Slack block array of block objects.
   */
  notifyAdminConfirm: (details) => {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Project recommendation alert: *${details.volunteer}* has accepted the recommended project and has conditionally joined *${details.project}*.`,
        },
      },
    ];
  },

  /**
   * Notifaction to an admin informing them that the volunteerd declined the project.
   *
   * @param {object} details - object containing name of the volunteer and name of project.
   * @returns {array} - Slack block array of block objects.
   */
  notifyAdminDecline: (details) => {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Project recommendation alert: *${details.volunteer}* has rejected the recommended project, *${details.project}*, and has opted to schedule a 1:1 with you.`,
        },
      },
    ];
  },
};

module.exports = {
  messageBlocks,
};
