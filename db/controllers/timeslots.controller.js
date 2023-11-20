const { models } = require('../index');

const addTimeslots = async (timeslots, volunteerId, projectId) => {
    const slotsWithId = timeslots.map((slot) => {
        return {...slot, volunteerId, projectId}
    });
    await models.Timeslot.bulkCreate(slotsWithId)
                .catch(err => console.log(err));
};

const editTimeslot = async (timeslot) => {
    await models.Timeslot.update({
        startHour: timeslot.startHour,
        startMinute: timeslot.startMinute,
        endHour: timeslot.endHour,
        endMinute: timeslot.endMinute
    },{ where: { id: timeslot.id }});
}

const deleteTimeslot = async (id) => {
    await models.Timeslot.destroy({ where: { id }});
}

const addTimeslot = async (req, res) => {
    const { timeslot } = req.body;
    const timeslotJson = JSON.parse(timeslot);

    const newSlot = await models.Timeslot.create(timeslotJson)
          .catch(err => res.status(400).json({ error: err }));

    return res.status(200).json({ message: `Timeslot ${newSlot.id} created.` });
}

const editTimeslotRest = async(req, res) => {
    const { timeslot } = req.body;
    const { id } = req.params;
    let findError, updateError;
    
    const timeslotJson = JSON.parse(timeslot);

    const currTimeslot = await models.Timeslot.findByPk(id)
                            .catch(err => findError = err);

    if (findError) {
        return res.status(400).json({ error: findError });
    }
    if (!currTimeslot) {
        return res.status(404).json({ error: `Timeslot does not exist`});
    }

    await currTimeslot.update(timeslotJson)
    .catch(err => updateError = err);

    if (updateError) {
        return res.status(400).json({ error: findError });
    }
                        
    return res.status(200).json({ result: `Timeslot ${currTimeslot.id} has been updated`});

};

const deleteTimeslotRest = async(req, res) => {
    let findError, deleteError;

    const timeslot = await models.Timeslot.findByPk(req.params.id)
                            .catch(err => findError = err);

    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (timeslot) {

        await timeslot.destroy()
        .catch(err => deleteError = err);

        if (deleteError) {
            return res.status(400).json({ error: deleteError });
        }

        res.status(200).json({ result: `Timeslot ${req.params.id} has been removed.`});
    } else {
        res.status(404).json({ result: `Timeslot ${req.params.id} does not exist.`});
    }
}

module.exports = {
    addTimeslots,
    addTimeslot,
    editTimeslotRest,
    deleteTimeslotRest,
    editTimeslot,
    deleteTimeslot
};
