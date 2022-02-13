const { models } = require('../index');

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
    const volunteer = await models.volunteer.findByPk(req.params.id)
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
        employer,
        student,
        jobTitle,
        onboardingAttendedAt,
        oneOnOneAttendedAt
    } = req.body;

    let error;
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
    })
    .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    res.status(200).json({ result: `Volunteer ${result.id} has been added to the database.`});
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
        oneOnOneAttendedAt
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
        oneOnOneAttendedAt
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


module.exports = {
    getVolunteers,
    getVolunteer,
    addVolunteer,
    editVolunteer,
    removeVolunteer
};
