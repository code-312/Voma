require('dotenv').config({ 
    path: `./.env.${process.env.NODE_ENV}`
});
const { models } = require('../index');
const axios = require('axios');
const Volunteer = models.volunteer;
const Skill = models.skill;
const VolunteerSkills = models.VolunteerSkills;

const getVolunteers = async (req, res) => {
    let error;
    const volunteers = await models.volunteer.findAll()
                             .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    res.json(volunteers);
};

const getVolunteer = async (req, res) => {
    let error;
    const volunteer = await Volunteer.findByPk(req.params.id, {
      include: models.skill
    })
                            .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    if (volunteer) {
        res.json(volunteer);
    } else {
        res.status(404).json({ result: `Volunteer ${req.params.id} does not exist.`});
    }
};

const addVolunteer = async (req, res) => {
    const {
        name,
        email,
        slackUserId,
        pronouns,
        skill,
        // employer,
        // student,
        // jobTitle,
        // onboardingAttendedAt,
        // oneOnOneAttendedAt,
    } = req.body;

    let error;
    const vol = await Volunteer.create({
        name,
        email,
        slackUserId,
        pronouns,
        skill,
        // employer,
        // student,
        // jobTitle,
        // onboardingAttendedAt,
        // oneOnOneAttendedAt,
    }, {
      // include: [models.skill]
    })
    .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }
    // Add skill after creating user.
    if (skill) {
      // Check to see if skill exists by searching for name
      try {

        const existingSkill = await Skill.findOne({ where: { name: skill } });
        let skillID;
        if (existingSkill) {
          skillID = existingSkill.id;
        } else {
          // If it doesn't, create a new skill
        const newSkill = await Skill.create({
          name: skill
        });
        skillID = newSkill.id;
      }
      // Add skill to volunteer
      const association = await VolunteerSkills.create({
        volunteerId: vol.id,
        skillId: skillID,
      });
    } catch (err) {
      res.json({ result: "There has been an error", error: err });
    }
  }

    res.json({ result: `Volunteer ${vol.id} has been added to the database.`});
};

const editVolunteer = async (req, res) => {
    const {
        name,
        email,
        slackUserId,
        pronouns,
        employer,
        student,
        jobTitle,
        onboardingAttendedAt,
        oneOnOneAttendedAt,
        projectId
    } = req.body;

    let findError, updateError;

    const volunteer = await models.volunteer.findByPk(req.params.id)
                            .catch(err => findError = err);

    if (findError) {
        return res.status(400).json({ error: findError });
    }
    if (!volunteer) {
        return res.status(404).json({ error: `Volunteer ${req.params.id} does not exist`});
    }

    await volunteer.update({
        name,
        email,
        slackUserId,
        pronouns,
        employer,
        student,
        jobTitle,
        onboardingAttendedAt,
        oneOnOneAttendedAt,
        projectId
    })
    .catch(err => updateError = err);

    if (updateError) {
        res.status(400).json({ error: updateError });
    }

    res.status(200).json({ result: `Volunteer ${req.params.id} has been updated.`});
};

const removeVolunteer = async (req, res) => {
    let findError, deleteError;

    const volunteer = await models.volunteer.findByPk(req.params.id)
                            .catch(err => findError = err);

    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (volunteer) {

        await volunteer.destroy()
        .catch(err => deleteError = err);

        if (deleteError) {
            return res.status(400).json({ error: deleteError });
        }

        res.status(200).json({ result: `Volunteer ${req.params.id} has been removed.`});
    } else {
        res.status(404).json({ result: `Volunteer ${req.params.id} does not exist.`});
    }
};

/**
 * Route checking if a volunteer has signed up for the Code for Chicago Slack channel.
 * 
 * @param {*} req - Client request object.
 * @param {*} res - Request response object.
 */
const validateVolunteerSlack = async (req, res) => {
    const email = req.body?.email

    if (!email) {
        res.json({
            exists: false,
            error: 'Email required.',
        });
    }

    try {

        const result = await axios.get('https://slack.com/api/users.lookupByEmail', {
            params: { email },
            headers: {
                'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        });

        if (result?.data?.user) { // User found.
            const profile = result.data.user;
            const volunteer = {
                suid: profile.id                || '', // Slack User ID.
                name: profile.real_name         || '', // Real Name.
//                img:  profile.profile.image_192 || '', // Slack Profile Image.
                exists: true,
            }
            res.json(volunteer);

        } else if (result.data.error) {
            res.json({
                exists: false,
                error: result.data.error,
            });

        } else {
            res.json({
                exists: false,
                error: 'Slack API response invalid.',
                response: JSON.stringify(result), // For debugging on the front end.
            });
        }

    } catch (err) {
        res.json({
            exists: false,
            error: err
        });
    }
}


module.exports = {
    getVolunteers,
    getVolunteer,
    addVolunteer,
    editVolunteer,
    removeVolunteer,
    validateVolunteerSlack
};
