const { models } = require('../index');
const Admin = models.admin;
const bcrypt = require('bcrypt');

const getAdmin = async (req, res) => {
    let error;
    const admin = await models.admin.findByPk(req.params.id, {
        attributes: {
            exclude: ['password'],
        }
    })
        .catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    if (admin) {
        res.json(admin);
    } else {
        res.status(404).json({ result: `Admin ${req.params.id} not found.` });
    }
}

const addAdmin = async (req, res) => {
    let error;
    const {
        name,
        email,
        password
    } = req.body;

    const result = await models.admin.create({
        name,
        email,
        password
    }).catch(err => error = err);

    if (error) {
        return res.status(400).json({ error });
    }

    res.json({ result: `Admin ${result.id} has been created.` });
}

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const admin = await Admin.findOne({ where: { email } })
        .catch(err => {
            console.log(err);
            return res.json({
                error: err,
                message: 'Unable to validate credentials.'
            });
        });

    if (admin?.password) {
        const authenticated = await bcrypt.compareSync(password, admin.password);
        if (authenticated) {
            req.session.isAuthenticated = true;
            res.json({ success: true });
            res.end();
            return;
        }
    }

    return res.json({
        error: {},
        message: 'Unable to validate credentials.'
    });
}

/**
 * Route updating cookie max-age and returning login state.
 * GET /api/authenticated
 * 
 * @param {*} req - Client request object.
 * @param {*} res - Request response object.
 */
const loginState = async (req, res) => {
    if (req.session) {
        req.session.touch();
    }

    res.json({ state: req?.session?.isAuthenticated }).end();
}

module.exports = {
    getAdmin,
    addAdmin,
    loginState,
    login
};