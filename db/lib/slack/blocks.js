/**
 * Slack message blocks. 
 * 
 * Slack has a GUI block editor: https://app.slack.com/block-kit-builder/ 
 * Note: The GUI gives you a malformed JSON string you need to take the top
 * level "blocks" key out. Properly formatted it should be [{},{},{}].
 */
const messageBlocks = {

    /**
     * Welcome to project message block.
     * @param {string} project - Project name. 
     * @returns {array} - Slack block array of block objects.
     */
    projectWelcomeConfirm: (project) => {
        return [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `🎉 You've been selected to help with ${project}! 🎉`,
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Are you able to join the project?"
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Yes",
                                    "emoji": true
                                },
                                "value": "yes"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "No",
                                    "emoji": true
                                },
                                "value": "no"
                            }
                        ],
                        "action_id": "projectWelcomeConfirm"
                    }
                ]
            }
        ];
    },

    /**
     * Welcome to project message block - User responds "No".
     * @returns {array} - Slack block array of block objects.
     */
    projectWelcomeConfirmNo: () => {
        return [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "We're sorry you can't be involved.",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You need to schedule a meeting ... with ... link here."
                }
            }
        ];
    },

    /**
     * Welcome to the project message block - User responds "Yes".
     * @returns {array} - Slack block array of block objects.
     */
    projectWelcomeConfirmYes: () => {
        return [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "😄👍 Amazing! Thanks for joining the team!!",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "We're excited for you to get going on the project. Can we add you to a few things and send you a few things? Would you please answer a few questions?"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "GithubUsername"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Github Username",
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "We'd like to add you to the project repository, what's your Github *username*? If you don't have one you can <https://google.com|register free here>."
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "googleDriveEmail"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Google Drive Email",
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "We have some project files and documentation we'd like to add you to, what's a good *email* for a Google Drive invite?"
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "trelloEmail"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Trello Email",
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "We use Trello for ticketing on this project. What email is on your Trello account? If you don't have one you can <https://google.com|register free here>."
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Let's Get Started",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "projectWelcomeCredentials"
                    }
                ]
            }
        ];
    }

};

module.exports = {
    messageBlocks,
};