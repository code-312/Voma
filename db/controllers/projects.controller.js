const { models } = require('../index');
const { addTimeslots, editTimeslot, deleteTimeslot } = require('./timeslots.controller');
const { editLink, addLinks, deleteLink } = require('./links.controller');

const getProjects = async (req, res) => {
  let error;
  const projects = await models.project
    .findAll({
      where: {
        active: true,
      },
      include: [
        {
          model: models.Timeslot,
        },
        {
          model: models.Link,
        },
      ],
    })
    .catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }

  res.json(projects);
};

const getArchivedProjects = async (req, res) => {
  let error;
  const projects = await models.project
    .findAll({
      where: {
        active: false,
      },
    })
    .catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }

  res.json(projects);
};

const getProject = async (req, res) => {
  let error;
  const project = await models.project
    .findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: models.Timeslot,
        },
        {
          model: models.Link,
        },
      ],
    })
    .catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }

  if (project) {
    res.json(project);
  } else {
    res.status(400).json({ error: `Project ${req.params.id} does not exist.` });
  }
};

const addProject = async (req, res) => {
  let error;
  const { name, description } = req.body;

  const result = await models.project
    .create({
      name,
      description,
    })
    .catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }

  res.json({ result: `Project ${result.id} has been added to the database.`, id: result.id });
};

const processItems = async (newItems, currItems, projectId, volunteerId, modelMethods) => {
  const itemsToAdd = [];

  const toDelete = currItems.filter((item) => {
    return !newItems.find((newItem) => newItem.id == item.dataValues.id);
  });

  newItems.forEach((item) => {
    if (!currItems.find((oldItem) => oldItem.dataValues.id === item.id)) {
      itemsToAdd.push({ ...item, id: null }); // new items contain a randomly generated id that will throw an error if not removed
    } else {
      modelMethods.edit(item);
    }
  });

  if (itemsToAdd.length > 0) {
    modelMethods.add(itemsToAdd, projectId, volunteerId);
  }
  if (toDelete.length > 0) {
    toDelete.forEach((slot) => modelMethods.delete(slot.id));
  }
};

const processTimeslots = async (newTimeslots, currTimeslots, projectId, volunteerId) => {
  const modelMethods = {
    edit: editTimeslot,
    add: addTimeslots,
    delete: deleteTimeslot,
  };
  processItems(newTimeslots, currTimeslots, projectId, volunteerId, modelMethods);
  // const newSlots = [];

  // const toDelete = currTimeslots.filter((slot) => {
  //     return !newTimeslots.find((newSlot) => newSlot.id == slot.dataValues.id);
  // });

  // newTimeslots.forEach((slot) => {
  //     if (!currTimeslots.find(oldSlot => oldSlot.dataValues.id === slot.id)) {
  //         newSlots.push({...slot, id: null }); // new slots contain a randomly generated id that will throw an error if not removed
  //     } else {
  //         editTimeslot(slot);
  //     }
  // });

  // if (newSlots.length > 0) {
  //     addTimeslots(newSlots, null, projectId);
  // }
  // if (toDelete.length > 0) {
  //     toDelete.forEach(slot => deleteTimeslot(slot.id));
  // }
};

const processLinks = async (newLinks, currLinks, projectId) => {
  const modelMethods = {
    edit: editLink,
    add: addLinks,
    delete: deleteLink,
  };
  processItems(newLinks, currLinks, projectId, null, modelMethods);
};

const editProject = async (req, res) => {
  let findError, updateError;
  console.log(req.body);

  const project = await models.project
    .findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: models.Timeslot,
        },
        {
          model: models.Link,
        },
      ],
    })
    .catch((err) => (findError = err));

  if (findError) {
    return res.status(400).json({ error: findError });
  }

  if (project) {
    processTimeslots(req.body.Timeslots, project.Timeslots, project.id, null);
    processLinks(req.body.Links, project.Links, project.id);
    const result = await project.update(req.body).catch((err) => (updateError = err));

    if (updateError) {
      return res.status(400).json({ error: updateError });
    }

    res.json({ result: `Project ${req.params.id} has been updated` });
  } else {
    return res.status(404).json({ error: `Project ${req.params.id} does not exist.` });
  }
};

const removeProject = async (req, res) => {
  let findError, deleteError;

  const project = await models.project.findByPk(req.params.id).catch((err) => (findError = err));

  if (findError) {
    return res.status(400).json({ error: findError });
  }

  if (project) {
    await project.destroy().catch((err) => (deleteError = err));

    if (deleteError) {
      return res.status(400).json({ error: deleteError });
    }

    res.status(200).json({ result: `Project ${req.params.id} has been removed.` });
  } else {
    res.status(404).json({ result: `Project ${req.params.id} does not exist.` });
  }
};

const archiveProject = async (req, res) => {
  await models.project
    .update(
      { active: false },
      {
        where: {
          id: req.params.id,
        },
      },
    )
    .catch((err) => res.status(404).json({ result: err }));

  return res.status(200).json({ result: `Project ${req.params.id} has been archived.` });
};

const reactivateProject = async (req, res) => {
  await models.project
    .update(
      { active: true },
      {
        where: {
          id: req.params.id,
        },
      },
    )
    .catch((err) => res.status(404).json({ result: err }));

  return res.status(200).json({ result: `Project ${req.params.id} has been reactivated.` });
};

module.exports = {
  getProjects,
  getProject,
  addProject,
  editProject,
  removeProject,
  archiveProject,
  reactivateProject,
  getArchivedProjects,
  processTimeslots,
};
