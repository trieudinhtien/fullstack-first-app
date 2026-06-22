const User = require('./User');
const Area = require('./Area');
const Room = require('./Room');

Area.hasMany(Room, {
  foreignKey: 'areaId',
  as: 'rooms',
});

Room.belongsTo(Area, {
  foreignKey: 'areaId',
  as: 'area',
});


module.exports = {
  User, Area, Room
}