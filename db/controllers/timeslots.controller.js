const { models } = require('../index');

const addTimeslots = async (timeslots, volunteerId) => {
    const slotsWithId = timeslots.map((slot) => {
        return {...slot, volunteerId}
    });
    await models.Timeslot.bulkCreate(slotsWithId)
                .catch(err => console.log(err));
};

const editTimeslot = async(req, res) => {
    const { timeslot } = req.body;
    let findError, editError;
    
    const timeslotJson = JSON.parse(timeslot);

    const currTimeslot = await models.Timeslot.findByPk(timeslotJson.id)
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

const deleteTimeslot = async(req, res) => {
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
    editTimeslot,
    deleteTimeslot
};
