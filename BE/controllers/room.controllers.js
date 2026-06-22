const { Room, Area } = require("../models")

const {paginate} = require('./helper');

const GetAllRooms = async (req, res) => {
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
};

const GetDetailRooms = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Room.findByPk(id);

    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const CreateRoom = async (req, res) => {
  try {
    const {code ,floor, price, status, areaId} = req.body;

    const created = await Room.create({code ,floor, price, status, areaId})

    res.status(200).json(created);


    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const UpdateRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const {code ,floor, price, status, areaId} = req.body;

    const updated = await Room.update({code ,floor, price, status, areaId}, {
      where: {
        id
      }
    })

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const DeleteRoom = async (req,res) => {
  try {
    const id = req.params.id;

    await Room.destroy({
      where: {
        id: id
      }
    })
    res.status(200).json({message: 'Delete sucessfully!'});
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const UpdateStatusRoom = async(req, res) => {
  try {
    const id = req.params.id;

    const status = req.body;
    
    const updated = await Room.update({status}, {
      where: {
        id
      }
    })

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const GetRoomsByArea = async(req, res) => { 
  try {
    const id = req.params.id;

    const data = await Area.findByPk(id, {
      include: [
        {
          model: Room,
          as: "rooms",
        },
      ],
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
  
}



module.exports = {
  GetAllRooms, GetDetailRooms, CreateRoom, UpdateRoom, DeleteRoom, UpdateStatusRoom, GetRoomsByArea
}