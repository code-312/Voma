const { models } = require('../index');

const addTimeslots = async (timeslots, volunteerId) => {
    const slotsWithId = timeslots.map((slot) => {
        return {...slot, volunteerId}
    });
    await models.Timeslot.bulkCreate(slotsWithId)
                .catch(err => console.log(err));
};

const editTimeslots = async(req, res) => {
    const { volunteerId } = req.body;
    const volunteer = await models.volunteer.findByPk(volunteerId,  {
        include: [{
            model: models.skill
        }, {
            model: models.Event
        }, {
            model: models.Timeslot
        }
        
    ]
    })
    .catch(err => console.log(err));

    if (volunteer) {
        const existingSlots = volunteer.Timeslots;
        // console.log(volunteer);
        existingSlots.forEach((slot) => {
            console.log(slot.day);
            console.log(slot.startHour);
        });
    }

    return res.status(200);

};

module.exports = {
    addTimeslots,
    editTimeslots
};
