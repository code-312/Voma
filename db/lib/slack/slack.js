require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}`});

const axios = require('axios');
const { messageBlocks } = require('./blocks');

const apiEndpoint = 'https://slack.com/api';
const token = process.env?.SLACK_BOT_TOKEN || '';

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
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
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
 * Send a slack message (text) to a channel.
 * 
 * Requires [chat:write] and [channels:read] permissions from the Slack API.
 * 
 * @param {string} channel - Channel to post to (no hashtag), for example "voma".
 * @param {string} message - Message to post to the channel.
 */
 const slackTextMessageChannel = async (channel, message) => {
    if (!channel || !message) return false;

    const channelId = await slackGetChannelId(channel);

    try {
        const params = {
            channel: channelId,
            text: message,
        };
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        const result = await axios
                        .post(`${apiEndpoint}/chat.postMessage`, params, options)
                        .then(res =>  res.data);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}


/**
 * Send a slack message (text) to a user.
 * 
 * Requires [chat:write] permission from the Slack API.
 * 
 * @param {string} slackUserId - Slack ID of the recipient. 
 * @param {string} message     - Message to post.
 */
 const slackTextMessageUser = async (slackUserId, message) => {
    if (!message || !slackUserId) return false;

    try {
        let params = {
            channel: slackUserId,
            text: message,
        };

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        const result = await axios
                        .post(`${apiEndpoint}/chat.postMessage`, params, options)
                        .then(res =>  res.data);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Send a slack message (blocks) to a channel.
 * 
 * Requires [chat:write] and [channels:read] permissions from the Slack API.
 * 
 * @param {string} channel     - Channel to post to (no hashtag), for example "voma".
 * @param {string} blockName   - Block name. Should be a method defined in lib/slack/blocks.js 
 * @param {array}  blockParams - (optional) Block params if needed. 
 */
 const slackBlockMessageChannel = async (channel, blockName, blockParams=false) => {
    if (!blockName || !channel || (typeof blockParams == 'undefined')) return false;

    const channelId = await slackGetChannelId(channel);

    if (! messageBlocks[blockName]?.()) { // Check that block is configured.
        console.error('slackBlockMessageChannel', `Block ${blockName} not set.`);
        return false;
    }

    let blocks = messageBlocks[blockName](blockParams);

    try {
        const params = {
            channel: channelId,
            blocks
        };
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        const result = await axios
                        .post(`${apiEndpoint}/chat.postMessage`, params, options)
                        .then(res =>  res.data);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Send a slack message (blocks) to a user.
 * 
 * Requires [chat:write] permission from the Slack API.
 * 
 * @param {string} slackUserId - Slack ID of the recipient. 
 * @param {string} blockName   - Block name. Should be a method defined in lib/slack/blocks.js 
 * @param {array}  blockParams - (optional) Block params if needed. 
 */
 const slackBlockMessageUser = async (slackUserId, blockName, blockParams=false) => {
    if (!blockName || !slackUserId || (typeof blockParams == 'undefined')) return false;

    if (! messageBlocks[blockName]?.()) { // Check that block is configured.
        console.error('slackBlockMessageUser', `Block "${blockName} not set.`);
        return false;
    }

    let blocks = messageBlocks[blockName](blockParams);

    try {
        let params = {
            channel: slackUserId,
            blocks
        }

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        const result = await axios
                        .post(`${apiEndpoint}/chat.postMessage`, params, options)
                        .then(res =>  res.data);

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Updates a slack message (blocks) to a user.
 * 
 * Requires [chat:write] permission from the Slack API.
 * 
 * @param {string} channelId   - Channel ID from the hook payload. 
 * @param {string} ts          - Timestamp from the original message.
 * @param {string} blockName   - Block name. Should be a method defined in lib/slack/blocks.js 
 * @param {array}  blockParams - (optional) Block params if needed. 
 */
 const slackBlockUpdateChat = async (slackUserId, ts, blockName, blockParams=false) => {
    if (!blockName || !slackUserId || !ts || (typeof blockParams == 'undefined')) return false;

    if (! messageBlocks[blockName]?.()) { // Check that block is configured.
        console.error('slackBlockMessageUser', `Block "${blockName} not set.`);
        return false;
    }

    let blocks = messageBlocks[blockName](blockParams);

    try {
        let params = {
            channel: slackUserId,
            ts,
            blocks
        }

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        const result = await axios
                        .post(`${apiEndpoint}/chat.update`, params, options)
                        .then(res =>  res.data);

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
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        });

        return result;

    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Opens a dialog with a user.
 */

module.exports = {
    token,
    slackGetChannelId,
    slackBlockUpdateChat,
    slackTextMessageChannel,
    slackBlockMessageChannel,
    slackTextMessageUser,
    slackBlockMessageUser,
    slackLookupByEmail,
};