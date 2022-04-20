require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}`});

const axios = require('axios');
const apiEndpoint = 'https://slack.com/api';

/**
 * Get ID of channel if it exists..
 * 
 * Requires [channels:read] permissions from the Slack API.
 * 
 * @param {string} channel - Channel name (no hashtag) for example "voma".
 */
 const slackGetChannelId = async (channel) => {
    try {
        const response = await axios.get(`${apiEndpoint}/conversations.list`,{
            headers: {
                'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        });

        let channelId = '';
        if (response.data?.ok && response.data?.channels) {
            for (let i=0; i<response.data.channels.length; i++) {
                if (channel == response.data.channels[i]?.name) {
                    channelId = response.data.channels[i]?.id;
                }
            }
        }

        return channelId;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Send a slack message to a channel.
 * 
 * Requires [chat:write] and [channels:read] permissions from the Slack API.
 * 
 * @param {string} channel - Channel to post to (no hashtag), for example "voma".
 * @param {string} message - Message to post to the channel.
 */
 const slackMessageChannel = async (channel, message) => {
    if (!channel || !message) return false;

    const channelId = await slackGetChannelId(channel);

    try {
        const params = {
            channel: channelId,
            text: message,
        };
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        };
        const result = await axios.post(`${apiEndpoint}/chat.postMessage`, params, options);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}


/**
 * Send a slack message to a user.
 * 
 * Requires [chat:write] permission from the Slack API.
 * 
 * @param {string} user - User to post to, for example 
 * @param {string} slackUserId - Slack ID of the recipient. 
 */
 const slackMessageUser = async (channel, slackUserId) => {
    if (!channel || !slackUserId) return false;

    try {
        const params = {
            channel,
            text: slackUserId,
        };
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        };
        const result = await axios.post(`${apiEndpoint}/chat.postMessage`, params, options);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Lookup a user by email.
 * 
 * Requires [users.read] and [users:read.email] permissions from the Slack API.
 * 
 * @param {string} email - Email to get profile for.
 */
 const slackLookupByEmail = async (email) => {
    if (!email) return false;

    try {
        const result = await axios.get(`${apiEndpoint}/users.lookupByEmail`, {
            params: { email },
            headers: {
                'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        });

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = {
    slackGetChannelId,
    slackMessageChannel,
    slackMessageUser,
    slackLookupByEmail,
};