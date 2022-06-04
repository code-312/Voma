const { models } = require('../index');
const Link = models.Link;

const addLink = async (req, res) => {
    let error;
    const { 
        title,
        url,
        required,
        projectId
    } = req.body;

    const result = await Link.create({
        title,
        url,
        required,
        projectId: parseInt(projectId),
    })
    .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    res.json({ result: `Link ${result.id} has been added to the database.` });
};

module.exports = {
    addLink
};