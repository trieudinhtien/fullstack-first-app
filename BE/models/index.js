const User = require('./User');
const Area = require('./Area');
const Room = require('./Room');
const Tenant = require('./Tenant');


//Room
Area.hasMany(Room, {
  foreignKey: 'areaId',
  as: 'rooms',
});

Room.belongsTo(Area, {
  foreignKey: 'areaId',
  as: 'area',
});

//Tenant
Tenant.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'room',
})

Room.hasMany(Tenant, {
  foreignKey: 'roomId',
  as: 'tenants'
})


module.exports = {
  User, 
  Area, 
  Room,
  Tenant
}