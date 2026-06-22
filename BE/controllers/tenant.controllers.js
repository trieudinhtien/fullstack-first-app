const { Tenant } = require("../models");

const {paginate} = require('./helper');


const GetAllTenants =  async (req, res) => {
  try {
    const { limit, offset } = paginate(
      req.query.page || 1,
      req.query.limit || 10
    );

    const { count, rows } = await Room.findAndCountAll({
      offset: offset,
      limit: limit,
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

// Lấy phòng kèm danh sách người thuê:
// Lấy người thuê kèm thông tin phòng:


module.exports = {
  GetAllTenants,
}