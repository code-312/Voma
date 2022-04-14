require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}`});

const axios = require('axios');
const apiEndpoint = 'https://slack.com/api/chat.postMessage';

/**
 * Function for sending a message to a channel.
 * 
 * Requires [chat:write] permission from the Slack API.
 * 
 * @param {string} channel - Channel to post to, for example #voma.
 * @param {string} message - Message to post to the channel.
 */
 const slackMessageChannel = async (channel, message) => {
    if (!channel || !message) return false;

    try {
        const params = {
            channel,
            text: message,
        };
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        };
        const result = await axios.post(`${apiEndpoint}/api/chat.postMessage`, params, options);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Function for sending a message to a user.
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
        const result = await axios.post(`${apiEndpoint}/api/chat.postMessage`, params, options);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Lookup a user by email.
 * 
 * Requires [users:read.email] permission from the Slack API.
 * 
 * @param {string} email - Email to get profile for.
 */
 const slackLookupByEmail = async (email) => {
    if (!email) return false;

    try {
        const result = await axios.get('https://slack.com/api/users.lookupByEmail', {
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
    slackMessageChannel,
    slackMessageUser,
    slackLookupByEmail,
};