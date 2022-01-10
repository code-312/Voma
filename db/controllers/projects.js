const { models } = require('../index');

const getProjects = async (req, res) => {
    let error;
    const projects = await models.project.findAll()
                    .catch(err => error = err);
    
    if (error) {
        res.status(400).json({ error });
    }

    res.json(projects);
};

const getProject = async (req, res) => {
    let error;
    const project = await models.project.findByPk(req.params.id)
                          .catch(err => error = err);
                    
    if (error) {
        res.status(400).json({ error });
    }

    if (project) {
        res.json(project);
    } else {
        res.status(400).json({ error: `Project ${req.params.id} does not exist.` });
    }
};

const addProject = async (req, res) => {
    let error;
    const { 
        name,
        description
    } = req.body;

    const result = await models.project.create({
        name,
        description
    })
    .catch(err => error = err);

    if (error) {
        res.status(400).json({ error });
    }

    res.json({ result: `Project ${result.id} has been added to the database.` });
};

const editProject = async (req, res) => {
    const { 
        name,
        description
    } = req.body;

    let findError, updateError;

    const project = await models.project.findByPk(req.params.id)
                    .catch(err => findError = err);
    
    if (findError) {
        res.status(400).json({ error: findError });
    }

    if (project) {
        const result = await project.update({ name, description })
                             .catch(err => updateError = err);
        
        if (updateError) {
            res.status(400).json({ error: updateError });
        }
        
        res.json({ result: `Project ${req.params.id} has been updated`});
    } else {
        res.status(404).json({ error: `Project ${req.params.id} does not exist.`});
    }
};

const removeProject = async (req, res) => {
    let findError, deleteError;

    const project = await models.project.findByPk(req.params.id)
                            .catch(err => findError = err);
    
    if (findError) {
        return res.status(400).json({ error: findError });
    }

    if (project) {
        await project.destroy()
        .catch(err => deleteError = err);
        
        if (deleteError) {
            return res.status(400).json({ error: deleteError });
        }
        
        res.status(200).json({ result: `Project ${req.params.id} has been removed.`});
    } else {
        res.status(404).json({ result: `Project ${req.params.id} does not exist.`});
    }
};


module.exports = {
    getProjects,
    getProject, 
    addProject,
    editProject,
    removeProject
};
