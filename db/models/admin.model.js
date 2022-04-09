const { DataTypes } = require('sequelize');
const { bcrypt } = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes, bcrypt) => {
  const Admin = sequelize.define('admin', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    underscored: true,
    hooks: {
      beforeCreate: async (admin) => {
        if (admin.password) {
          const salt = await bcrypt.genSaltSync(saltRounds);
          admin.password = bcrypt.hashSync(admin.password, salt);
        }
      },
      beforeUpdate: async (admin) => {
        if (admin.password) {
          const salt = await bcrypt.genSaltSync(saltRounds);
          admin.password = bcrypt.hashSync(admin.password, salt);
        }
      }
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compare(password, this.password)
      }
    }
  });

  Admin.prototype.validPassword = (password, hash) => {
    return bcrypt.compare(password, hash);
  }

  return Admin;
}