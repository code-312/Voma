const { seq } = require('../index.js');
const { models } = require('../index');

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await models.volunteer.findAll();
        res.send(JSON.stringify(volunteers));
    } catch (err) {
        res.send(`Error! ${err}`);
    }
};

const getVolunteer = async (req, res) => {
    try {
        const volunteer = await models.volunteer.findAll({
            where: {
                id: req.params.id
            }
        });
        if (volunteer.length > 0) {
            res.send(JSON.stringify(volunteer));
        } else {
            res.send('Err! That volunteer does not exist.');
        }
    } catch (err) {
        res.send(`Error! ${err}`);
    }
};

const addVolunteer = async (req, res) => {
    const { 
        name,
        email,
        slackUserId,
        pronouns,
        employer,
        student,
        jobTitle,
        onboardingAttendedAt,
        oneOnOneAttendedAt
    } = req.body;
    try {
        const result = await models.volunteer.create({
            name,
            email,
            slackUserId,
            pronouns,
            employer,
            student,
            jobTitle,
            onboardingAttendedAt,
            oneOnOneAttendedAt
        });
        res.send(`User ${result.id} has been added to the database.`);
      } catch (err) {
        res.send(`Error! ${err}`);
      }
};

const editVolunteer = async (req, res) => {
    const { 
        id,
        name,
        email,
        slackUserId,
        pronouns,
        employer,
        student,
        jobTitle,
        onboardingAttendedAt,
        oneOnOneAttendedAt
    } = req.body;
    try {
        const result = await models.volunteer.update({
            name,
            email,
            slackUserId,
            pronouns,
            employer,
            student,
            jobTitle,
            onboardingAttendedAt,
            oneOnOneAttendedAt
        }, {
            where: {
                id: id
            }
        });
        res.send(`User ${result.id} has been updated`);
    } catch (err) {
        res.send(`Error! ${err}`);
    }
};

const removeVolunteer = async (req, res) => {
    try {
        const result = await models.volunteer.destroy({
            where: {
              id: req.params.id
            }
        });
        res.send(`User ${req.params.id} has been deleted`);
    } catch (err) {
        res.send(`Error: ${err}`);
    }
};


module.exports = {
    getVolunteers,
    getVolunteer, 
    addVolunteer,
    editVolunteer,
    removeVolunteer
};
