const { models } = require('../index');

const addEvent = async (name, volunteerId) => {
  let error;

  const event = await models.Event.create({ name, volunteerId }).catch((err) => (error = err));

  if (error) {
    return { success: false, error };
  }

  return { success: true, event };
};

const addRegisteredEvent = async (volunteerId) => {
  const result = await addEvent('Completed Registration', volunteerId);
  return result;
};

const addFinishedTasksEvent = async (volunteerId) => {
  const result = await addEvent('Finished Tasks', volunteerId);
  return result;
};

const addAssignedToProjectEvent = async (volunteerId) => {
  const result = await addEvent('Assigned To Project', volunteerId);
  return result;
};

const getEvents = async (req, res) => {
  const events = await models.Event.findAll().catch((err) => res.status(404).json({ error: err }));

  return res.status(200).json(events);
};

const bulkUpdate = async (req, res) => {
  const { events } = req.body;
  let error;

  const updateOrCreate = async () => {
    await Promise.all(
      events.map((event) => {
        if (event.isNew) {
          return models.Event.create({ name: event.name, volunteerId: event.volunteerId });
        } else {
          return models.Event.update(
            { name: event.name },
            {
              where: {
                id: event.id,
              },
            },
          ).catch((err) => (error = err));
        }
      }),
    );
  };

  updateOrCreate();

  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(200).json({ success: 'success' });
};

const editEvent = async (req, res) => {
  const { name, volunteerId, isNew } = req.body;

  let error;
  if (!isNew) {
    const event = await models.Event.findByPk(req.params.id).catch((err) => (error = err));

    if (event) {
      const result = await event.update({ name }).catch((err) => (error = err));
    }
  } else {
    const newResult = await addEvent(name, volunteerId);
    if (!newResult.success) {
      error = newResult.error;
    }
  }

  if (!error) {
    return res.status(200).json({ success: 'Success' });
  }
  return res.status(500).json({ error });
};

const addEventRest = async (req, res) => {
  const { name, volunteerId } = req.body;

  const result = await addEvent(name, volunteerId);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  return res.status(200).json({ message: `Event ${result.event.id} created.` });
};

const deleteEvent = async (req, res) => {
  let findError, deleteError;

  const event = await models.Event.findByPk(req.params.id).catch((err) => (findError = err));

  if (findError) {
    return res.status(400).json({ error: findError });
  }

  if (event) {
    await event.destroy().catch((err) => (deleteError = err));

    if (deleteError) {
      return res.status(400).json({ error: deleteError });
    }

    res.status(200).json({ result: `Event ${req.params.id} has been removed.` });
  } else {
    res.status(404).json({ result: `Event ${req.params.id} does not exist.` });
  }
};

const bulkDelete = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  let error;

  const bulkDeletePromise = async () => {
    await Promise.all(
      ids.map((id) => {
        return models.Event.destroy({ where: { id } }).catch((err) => (error = err));
      }),
    );
  };

  bulkDeletePromise();

  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(200).json({ success: 'success' });
};

module.exports = {
  addEvent,
  addAssignedToProjectEvent,
  addFinishedTasksEvent,
  addRegisteredEvent,
  addEventRest,
  getEvents,
  deleteEvent,
  editEvent,
  bulkUpdate,
  bulkDelete,
};
