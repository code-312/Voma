'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
    },
    volunteerId: {
      type: DataTypes.INTEGER,
    },
  });
  return Event;
};
