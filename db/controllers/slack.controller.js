const slack = require('../lib/slack/slack');

const responses = {
    projectWelcomeConfirm: {
        respond: async (action, request) => {
            const answer = action?.selected_option?.value || null;
            const channelId = request?.channel?.id || null;
            const ts = request?.message?.ts || null;

            const responseBlock = (answer=='yes' ? 'projectWelcomeConfirmYes' : 'projectWelcomeConfirmNo');
            const result = await slack.slackBlockUpdateChat(channelId, ts, responseBlock);

            return result;
        }
    },

    projectWelcomeCredentials: {
        respond: async (action, request) => {
            console.debug(action);
            console.debug(request.state.values); // Github, Trello, Google Drive info.
            // Update database.
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

    console.debug('action', action_id);
    console.debug('result', result);
};

module.exports = {
    slackBot,
};