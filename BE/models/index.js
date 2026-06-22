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
  onDelete: 'SET NULL',
})

Room.hasMany(Tenant, {
  foreignKey: 'roomId',
  as: 'tenants',
})

User.hasOne(Tenant, {
  foreignKey: 'userId',
  as: 'tenant'
})

Tenant.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})


module.exports = {
  User, 
  Area, 
  Room,
  Tenant
}