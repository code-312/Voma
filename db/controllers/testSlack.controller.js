const slack = require('../lib/slack/slack');

const send = {
    messageUserBlock: async function(req, res) {
        if (!req.query?.slackUserId || !req.query?.blockName) {
            console.error('testSlack.messageUserBlock', 'Missing required parameters.');
            res
                .json({
                    params: req.query,
                    response: 'Missing required parameters.',
                })
                .end(); return;
        }

        const slackUserId = req.query.slackUserId;
        const blockName   = req.query.blockName;
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

    messageUserText: async function(req, res) {
        if (!req.query?.slackUserId || !req.query?.message) {
            console.error('testSlack.messageUserBlock', 'Missing required parameters.');
            res
                .json({
                    params: JSON.stringify(req.query),
                    response: 'Missing required parameters.',
                })
                .end(); return;
        }

        const slackUserId = req.query.slackUserId;
        const message     = req.query.message;

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

    messageChannelBlock: async function(req, res) {
        if (!req.query?.channel || !req.query?.blockName) {
            console.error('testSlack.messageUserBlock', 'Missing required parameters.');
            res
                .json({
                    params: req.query,
                    response: 'Missing required parameters.',
                })
                .end(); return;
        }

        const channel     = req.query.channel;
        const blockName   = req.query.blockName;
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

    messageChannelText: async function(req, res) {
        if (!req.query?.channel || !req.query?.message) {
            console.error('testSlack.messageUserBlock', 'Missing required parameters.');
            res
                .json({
                    params: req.query,
                    response: 'Missing required parameters.',
                })
                .end(); return;
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
    }
};

const testMessageUserProject = async (req, res) => {
    // my slack id
    const slackId = 'U02KK4M789Y';
    const blockName = 'projectWelcomeConfirm';
    const project = {
        "id": 1,
        "name": "Code for Chicago WebPage",
        "description": "Help build our website and design system for the brigade network and hooray",
        "activelyRecruiting": true,
        "currentNeeds": [
            "Front-end",
            "Project Management",
            "Content Strategy",
            "Data Analytics",
            "Product Management"
        ],
        "tech": "Javascript, HTML, Express",
        "goodFitFor": "Nobody",
        "comment": "Here are some comments. and more!",
        "meetingCadence": "",
        "projectStatement": "",
        "deliverables": [],
        "createdAt": "2022-04-29T15:49:23.407Z",
        "updatedAt": "2022-07-24T17:38:23.486Z",
        "Links": []
    };

    const result = await slack.slackBlockMessageUser(slackId, blockName, project)
                    .catch((err) => console.log(err));

    if (result) {
        res.status(200).json({ result: 'Success! '});
    }
}

const receiveUserResponse = async (req, res) => {
    const { payload } = req.body;
    console.log(payload);

    return res.sendStatus(200);
}

module.exports = {
    send,
    testMessageUserProject,
    receiveUserResponse
};