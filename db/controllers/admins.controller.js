const { models } = require('../index');
const Admin = models.admin;

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
    res.status(404).json({ result: `Admin ${req.params.id} not found.`});
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

  res.json({result: `Admin ${result.id} has been created.`});
}

const login = async (req, res) => {
  let error;
  const {
    email,
    password
  } = req.body;

  const admin = await models.admin.findOne({where: {email: email}})
    .catch(err => error = err);

  if (error) {
    return res.status(500).json({ error });
  }
  if (admin === null) {
    // Avoid specifying that user is not found, to protect
    // against attacks.
    return res.status(401).json({result: `Cannot login with that email and password.`})
  }

  // Check password.
  admin.validPassword(password, admin.password)
    .then((passwordOk) => {
      if (passwordOk === true) {
        res.json({result: `${admin.email} is logged in.`})
      } else {
        res.status(401).json({result: `Cannot login with that email and password.`})
      }
    })
    .catch((err) => {
      console.log(`User auth error: ${err}`)
      res.status(500)
    })
}

module.exports = {
  getAdmin,
  addAdmin,
  login
};