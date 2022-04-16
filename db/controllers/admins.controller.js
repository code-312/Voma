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

const loginState = async (req, res) => {
    res.json({
        state: req.session.authenticated
    });
    res.end();
    return;
}


/**
 * Logout user. Destroy session and set 401 HTTP response code.
 * 
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const logout = async (req, res) => {
    if (req?.session) {
        req.session.destroy();
    }
    res.status(401)
        .json({ 
            state: false 
        })
        .end();
}

module.exports = {
    getAdmin,
    addAdmin,
    loginState,
    login,
    logout,
};