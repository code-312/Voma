const slack = require('../lib/slack/slack');

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

            switch(answer) {
                case 'yes':
                    // todo: Update the database with the response?
                    await slack.slackTextMessageUser('PROJECT_ADMIN_SLACK_ID', `PROJECT_NAME: VOLUNTEER_NAME has accepted and conditionally joined!`);
                    messageParams = {
                        name: 'PROJECT_NAME', 
                        links: [
                            {
                                label: 'Google Drive', 
                                url: 'https://google.link'
                            },
                            {
                                label: 'Trello',
                                url: 'https://trello.link'
                            }
                        ]
                    };
                    result = slack.slackBlockUpdateChat(channelId, ts, 'projectWelcomeConfirmYes', messageParams); // Block contents in lib/slack/blocks
                    break;


                case 'no':
                    // todo: Update the database with the response?
                    await slack.slackTextMessageUser('PROJECT_ADMIN_SLACK_ID', `PROJECT_NAME: VOLUNTEER_NAME has rejected the invite and has been prompted to schedule a 1:1 with you.`);
                    messageParams = 'SCHEDULE_FOLLOWUP_MEETING_URL';
                    result = slack.slackBlockUpdateChat(channelId, ts, 'projectWelcomeConfirmNo', messageParams); // Block contents in lib/slack/blocks
                    break;


                default: break;
            }
            
            // Display the next screen in the chat flow.
            result = await slack.slackBlockUpdateChat(channelId, ts, responseBlock);

            return result;
        }
    },
};

/**
 * Slack hooks hit this endpoint. There's only one endpoint so this function needs
 * to handle processing for all the hooks/actions.
 */
const slackBot = async (req, res) => {
    if (! req?.body?.payload) {
        res
            .json({
                message: 'Slack hook triggered with no payload.',
                request: req?.body,
            })
            .end(); return;
    }

    const data = JSON.parse(req.body.payload);

    let action_id, result;
    switch (data?.type) { 
        case 'block_actions': // Handle 'Block Actions'.
            for (let i=0; i<data.actions?.length; i++) {
                // Use the action_id set in the fields to find the right response function.
                action_id = data.actions[i].action_id;
                if (responses[action_id]) {
                    result = await responses[action_id].respond(data.actions[i], data);
                }
            }
            break;
        
        default: break;
    }

    // console.debug('slack.controller - slackBot - action_id', action_id);
    // console.debug('slack.controller - slackBot - result', result);
};

module.exports = {
    slackBot,
};