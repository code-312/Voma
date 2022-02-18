const { models } = require('../index');
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
        employer,
        student,
        jobTitle,
        onboardingAttendedAt,
        oneOnOneAttendedAt,
        skills
    } = req.body;

    let error;
    const vol = await Volunteer.create({
        name,
        email,
        slackUserId,
        pronouns,
        employer,
        student,
        jobTitle,
        onboardingAttendedAt,
        oneOnOneAttendedAt,
        skills
    }, {
      // include: [models.skill]
    })
    .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    // Add skills after creating user.
    for (let i = 0; i < skills.length; i++) {
      // If ID is passed with skill then assume we are adding
      // a reference to existing Skill.
      // If not, we must create a new Skill, then add the reference.
      if (skills[i].id) {
        let skillID = skills[i].id;
        const skill = await Skill.findByPk(skillID);
        if (skill === null) {
        } else {
          // Add skill to volunteer.
          const volSkill = await VolunteerSkills.create({
            volunteerId: vol.id,
            skillId: skillID,
          })
        }
      } else {
        // Skill not found. Create new Skill and create reference to user.
        let newSkill = await Skill.create({
          name: skills[i].name,
          description: skills[i].description
        });
        // @todo How to check if skill was properly created?
        if (newSkill) {
          const volSkill = await VolunteerSkills.create({
            volunteerId: vol.id,
            skillId: newSkill.id,
          })
        }
      }
    }

    res.status(200).json({ result: `Volunteer ${vol.id} has been added to the database.`});
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
