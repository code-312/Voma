const axios = require('axios');

const findUser = async (req, res) => {
  const { email } = req.body;
  // First, get a list of all users in the slack workspace
  try {
    const result = await axios.request({
      url: 'https://slack.com/api/users.list',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    });

    // If the initial request is successful, look through the returned users for one with a matching email
    if (result.data && result.data.members) {
      const foundUser = result.data.members.find((user) => {
        if (user.profile && user.profile.email) {
          return user.profile.email === email;
        }
      });
      if (foundUser) {
        res.json(foundUser);
      } else {
        res.status(404).json({ result: 'User not found in workspace' });
      }
    } else {
      throw new Error('No members present in response');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  findUser,
};
