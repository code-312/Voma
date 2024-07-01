const { models } = require('../index');
const Admin = models.admin;
const bcrypt = require('bcrypt');

const getAdmin = async (req, res) => {
  let error;
  const admin = await models.admin
    .findByPk(req.params.id, {
      attributes: {
        exclude: ['password'],
      },
    })
    .catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }

  if (admin) {
    res.json(admin);
  } else {
    res.status(404).json({ result: `Admin ${req.params.id} not found.` });
  }
};

const getAdminEmails = async (req, res) => {
  let error;
  const result = await models.admin
    .findAll({
      attributes: ['email'],
    })
    .catch((err) => (error = err));

  return error ? error : result;
};

const addAdmin = async (req, res) => {
  let error;
  const { name, email, password } = req.body;

  const result = await models.admin
    .create({
      name,
      email,
      password,
    })
    .catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }

  res.json({ result: `Admin ${result.id} has been created.` });
};

const editAdmin = async (req, res) => {
  let error;
  const { id, name, email } = req.body;

  const admin = await models.admin.findByPk(id, {
    attributes: {
      exclude: ['password'],
    },
  });
  if (admin === null) {
    return res.sendStatus(404);
  }

  const result = await admin.update({ name, email }).catch((err) => (error = err));

  if (error) {
    return res.status(400).json({ error });
  }

  return res.status(200).json({ result: `Admin ${admin.id} has been updated.` });
};

const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;

  const admin = await models.admin.findByPk(id);

  if (admin === null) {
    return res.sendStatus(404);
  }

  const validPassword = await bcrypt.compareSync(oldPassword, admin.password);
  if (!validPassword) {
    return res.json({ success: false, message: 'Invalid password' });
  }

  const result = admin
    .update({ password: newPassword })
    .catch((error) => res.status(400).json({ error }));

  return res.status(200).json({ result: `Admin ${admin.id}'s password has been updated.` });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } }).catch((err) => {
    console.log(err);
    return res.json({
      error: err,
      message: 'Unable to validate credentials.',
    });
  });

  if (admin?.password) {
    const authenticated = await bcrypt.compareSync(password, admin.password);
    if (authenticated) {
      req.session.isAuthenticated = true;
      res.json({ success: true, id: admin.id, name: admin.name, email: admin.email });
      res.end();
      return;
    }
  }

  return res.json({
    error: {},
    message: 'Unable to validate credentials.',
  });
};

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
};

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
  res
    .status(401)
    .json({
      state: false,
    })
    .end();
};

module.exports = {
  getAdmin,
  getAdminEmails,
  addAdmin,
  editAdmin,
  changePassword,
  loginState,
  login,
  logout,
};
