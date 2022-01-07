const { models } = require('../index');

exports.getSkills = async (req, res) => {
  var dbError
  const skills = await models.skill.findAll()
      .catch(err => dbError = err);

  if (dbError) { return res.status(400).json({"error": dbError}); }

  res.json(skills)
};

exports.getSkill = async (req, res) => {
    const skill = await models.skill.findByPk(req.params.id);
    if (skill === null) {
        return res.sendStatus(404);
    }
    res.json(skill);
};

exports.addSkill = async (req, res) => {
    const {
        name,
        description
    } = req.body;

    var dbError;
    const result = await models.skill.create({
        name,
        description
    }).catch(err => dbError = err);

    if (dbError) { return res.status(400).json({"error": dbError}); }

    res.json(result);
};

exports.editSkill = async (req, res) => {
    const skill = await models.skill.findByPk(req.params.id);
    if (skill === null) {
        return res.sendStatus(404);
    }

    const {
        name,
        description
    } = req.body;

    var dbError;
    skill.update({name: name, description: description})
      .catch(err => dbError = err);

    if (dbError) { return res.status(400).json({"error": dbError }); }

    res.json(skill);
};

exports.removeSkill = async (req, res) => {
    const skill = await models.skill.findByPk(req.params.id);
    if (skill === null) {
        return res.sendStatus(404);
    }

    try {
        // Delete always returns [].
        const result = await skill.destroy()
        res.json({"status": `skill ${req.params.id} removed`});
    } catch (err) {
        res.status(400).json({"error": err});
    }
};
