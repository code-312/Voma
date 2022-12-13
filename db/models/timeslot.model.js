'use strict';
const {
  Model
} = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Timeslot extends Model {
//   }
//   Timeslot.init({
//     day: DataTypes.ENUM(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
//     startHour: DataTypes.INTEGER,
//     startMinute: DataTypes.INTEGER,
//     endHour: DataTypes.INTEGER,
//     endMinute: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Timeslot',
//   });
//   return Timeslot;
// };

module.exports = (sequelize, DataTypes) => {
	const Timeslot = sequelize.define('Timeslot', {
    day: {

      type: DataTypes.ENUM(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
    }, 
    startHour: {
      
      type: DataTypes.INTEGER,
    }, 
    startMinute: {
      
      type: DataTypes.INTEGER,
    }, 
    endHour: {
      type: DataTypes.INTEGER,
    }, 
    endMinute: {
      type: DataTypes.INTEGER
    }, 
    volunteerId: {
      type: DataTypes.INTEGER,
    },
    projectId: {
      type: DataTypes.INTEGER,
    }
  });
  return Timeslot;
};