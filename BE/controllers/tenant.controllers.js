const { Tenant, Room, User } = require("../models");

const {paginate} = require('./helper');


const GetAllTenants =  async (req, res) => {
  try {
    const { limit, offset } = paginate(
      req.query.page || 1,
      req.query.limit || 10
    );

    const { count, rows } = await Tenant.findAndCountAll({
      offset: offset,
      limit: limit,
      include: [{
        model: User,
        as: 'user',
      }]
    });

    res.status(200).json({
      total: count,
      data: rows,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const GetTenantById =async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tenant.findByPk(id, {
      include: [{
        model: Room,
        as: 'room'
      },
      {
        model: User,
        as: 'user',
      }
      ]
      
    })

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  GetAllTenants,
  GetTenantById
}