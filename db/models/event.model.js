'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Event extends Model {
//   }
//   Event.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Event',
//   });
//   return Event;
// };
module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
    },
    volunteerId: {
      type: DataTypes.INTEGER,
    } 
  });
  return Event;
};