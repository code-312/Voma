const slack = require('../lib/slack/slack');

const send = {
  messageUserBlock: async function (req, res) {
    if (!req.query?.slackUserId || !req.query?.blockName) {
      console.error('testSlack.messageUserBlock', 'Missing required parameters.');
      res
        .json({
          params: req.query,
          response: 'Missing required parameters.',
        })
        .end();
      return;
    }

    const slackUserId = req.query.slackUserId;
    const blockName = req.query.blockName;
    const blockParams = req.query?.blockParams || false;

    slack.token = process.env?.TEST_SLACK_TOKEN || '';
    const response = await slack.slackBlockMessageUser(slackUserId, blockName, blockParams);
    console.debug(response);
    res
      .json({
        params: req.query,
        response,
      })
      .end();
  },

  messageUserText: async function (req, res) {
    if (!req.query?.slackUserId || !req.query?.message) {
      console.error('testSlack.messageUserBlock', 'Missing required parameters.');
      res
        .json({
          params: JSON.stringify(req.query),
          response: 'Missing required parameters.',
        })
        .end();
      return;
    }

    const slackUserId = req.query.slackUserId;
    const message = req.query.message;

    slack.token = process.env?.TEST_SLACK_TOKEN || '';
    const response = await slack.slackTextMessageUser(slackUserId, message);
    console.debug(response);
    res
      .json({
        params: JSON.stringify(req.query),
        response,
      })
      .end();
  },

  messageChannelBlock: async function (req, res) {
    if (!req.query?.channel || !req.query?.blockName) {
      console.error('testSlack.messageUserBlock', 'Missing required parameters.');
      res
        .json({
          params: req.query,
          response: 'Missing required parameters.',
        })
        .end();
      return;
    }

    const channel = req.query.channel;
    const blockName = req.query.blockName;
    const blockParams = req.query?.blockParams || false;

    slack.token = process.env?.TEST_SLACK_TOKEN || '';
    const response = await slack.slackBlockMessageChannel(channel, blockName, blockParams);
    console.debug(response);
    res
      .json({
        params: req.query,
        response,
      })
      .end();
  },

  messageChannelText: async function (req, res) {
    if (!req.query?.channel || !req.query?.message) {
      console.error('testSlack.messageUserBlock', 'Missing required parameters.');
      res
        .json({
          params: req.query,
          response: 'Missing required parameters.',
        })
        .end();
      return;
    }

    const channel = req.query.channel;
    const message = req.query.message;

    slack.token = process.env?.TEST_SLACK_TOKEN || '';
    const response = await slack.slackTextMessageChannel(channel, message);
    console.debug(response);
    res
      .json({
        params: req.query,
        response,
      })
      .end();
  },
};

const receiveUserResponse = async (req, res) => {
  const { payload } = req.body;
  console.log(payload);

  return res.sendStatus(200);
};

module.exports = {
  send,
  receiveUserResponse,
};
