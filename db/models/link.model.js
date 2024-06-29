module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    title: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    required: {
      type: DataTypes.BOOLEAN,
    },
    projectId: {
      type: DataTypes.INTEGER,
    },
  });
  return Link;
};
