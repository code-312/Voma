const { models } = require('../index');

const getEvents = async (req, res) => {
    const events = await models.Event.findAll()
                         .catch(err => res.status(404).json({ error: err }));

    return res.status(200).json(events);
}

const addEvent = async (req, res) => {
    const { name, volunteerId } = req.body;
    

    const newSlot = await models.Event.create({ name, volunteerId })
          .catch(err => res.status(400).json({ error: err }));

    return res.status(200).json({ message: `Event ${newSlot.id} created.` });
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
    getEvents,
    deleteEvent
};
