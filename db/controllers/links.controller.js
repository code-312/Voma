const { models } = require('../index');
const Link = models.Link;

const addLinks = async (links, projectId) => {
    const linksWithId = links.map((link) => {
        return {...link, projectId}
    });
    await Link.bulkCreate(linksWithId)
                .catch(err => console.log(err));
};

const editLink = async (link) => {
    await Link.update({
        title: link.title,
        url: link.url
    },{ where: { id: link.id }});
}

const deleteLink = async (id) => {
    await Link.destroy({ where: { id }});
}

const addLinkRest = async (req, res) => {
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

const editLinkRest = async (req, res) => {
    let findError, updateError;
    const {
        title,
        url,
        required
    } = req.body;

    const link = await Link.findByPk(req.params.id)
        .catch(err => findError = err);
    
    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (link) {
        const result = await link.update({ title, url, required })
                             .catch(err => updateError = err);
        
        if (updateError) {
            return res.status(400).json({ error: updateError });
        }
        
        res.json({ result: `Link ${req.params.id} has been updated`});
    } else {
        return res.status(404).json({ error: `Link ${req.params.id} does not exist.`});
    }
}

const removeLinkRest = async (req, res) => {
    let findError, deleteError;

    const link = await Link.findByPk(req.params.id)
                            .catch(err => findError = err);
    
    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (link) {
        await link.destroy()
        .catch(err => deleteError = err);
        
        if (deleteError) {
            return res.status(400).json({ error: deleteError });
        }
        
        res.status(200).json({ result: `Link ${req.params.id} has been removed.`});
    } else {
        res.status(404).json({ result: `Link ${req.params.id} does not exist.`});
    }
};

module.exports = {
    addLinks,
    editLink,
    deleteLink,
    addLinkRest,
    editLinkRest,
    removeLinkRest
};