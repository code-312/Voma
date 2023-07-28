const { models } = require('../index');

const addEvent = async (name, volunteerId) => {
    let error;

    const event = await models.Event.create({ name, volunteerId })
          .catch(err => error = err);


    if (error) {
        return { success: false, error };
    }
   
    return { success: true, event };
}

const addRegisteredEvent = async (volunteerId) => {
    const result = await addEvent("Completed Registration", volunteerId);
    return result;
}

const addFinishedTasksEvent = async (volunteerId) => {
    const result = await addEvent("Finished Tasks", volunteerId);
    return result;  
}

const addAssignedToProjectEvent = async (volunteerId) => {
    const result = await addEvent("Assigned To Project", volunteerId);
    return result;  
}

const getEvents = async (req, res) => {
    const events = await models.Event.findAll()
                         .catch(err => res.status(404).json({ error: err }));

    return res.status(200).json(events);
}

const editEvent = async (req, res) => {
    const { name, volunteerId } = req.body;
    console.log(name, volunteerId);
    let error;
    const event = await models.Event.findOne({
        where: { name, volunteerId }
    })
    .catch(err => error = err);

    if (event) {
        const reuslt = await event.update({ name, volunteerId }).catch(err => error = err);
    }

    if (!error) {
        return res.status(200).json({ success: "Success" });
    }
    return res.status(500).json({ error });
}

const addEventRest = async (req, res) => {
    const { name, volunteerId } = req.body;
    

    const result = await addEvent(name, volunteerId);

    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ message: `Event ${result.event.id} created.` });
}

const deleteEvent = async(req, res) => {
    let findError, deleteError;

    const event = await models.Event.findByPk(req.params.id)
                            .catch(err => findError = err);

    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (event) {

        await event.destroy()
        .catch(err => deleteError = err);

        if (deleteError) {
            return res.status(400).json({ error: deleteError });
        }

        res.status(200).json({ result: `Event ${req.params.id} has been removed.`});
    } else {
        res.status(404).json({ result: `Event ${req.params.id} does not exist.`});
    }
}

module.exports = {
    addEvent,
    addAssignedToProjectEvent,
    addFinishedTasksEvent,
    addRegisteredEvent,
    addEventRest,
    getEvents,
    deleteEvent,
    editEvent
};
