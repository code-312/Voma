const { seq } = require('../index.js');
const { models } = require('../index');

const getProjects = async (req, res) => {
    try {
        const projects = await models.project.findAll();
        res.send(JSON.stringify(projects));
    } catch (err) {
        res.send(`Error! ${err}`);
    }
};

const getProject = async (req, res) => {
    try {
        const project = await models.project.findAll({
            where: {
                id: req.params.id
            }
        });
        if (project.length > 0) {
            res.send(JSON.stringify(project));
        } else {
            res.send('Err! That project does not exist.');
        }
    } catch (err) {
        res.send(`Error! ${err}`);
    }
};

const addProject = async (req, res) => {
    console.log(req);
    const { 
        name,
        description
    } = req.body;
    console.log(req.body);
    try {
        const result = await models.project.create({
            name,
            description
        });
        res.send(`Project ${result.id} has been added to the database.`);
      } catch (err) {
        res.send(`Error! ${err}`);
      }
};

const editProject = async (req, res) => {
    const { 
        id,
        name,
        description
    } = req.body;
    try {
        const result = await models.project.update({
            name,
            description
        }, {
            where: {
                id: id
            }
        });
        res.send(`Project ${result.id} has been updated`);
    } catch (err) {
        res.send(`Error! ${err}`);
    }
};

const removeProject = async (req, res) => {
    try {
        const result = await models.project.destroy({
            where: {
              id: req.params.id
            }
        });
        res.send(`Project ${req.params.id} has been deleted`);
    } catch (err) {
        res.send(`Error: ${err}`);
    }
};


module.exports = {
    getProjects,
    getProject, 
    addProject,
    editProject,
    removeProject
};
