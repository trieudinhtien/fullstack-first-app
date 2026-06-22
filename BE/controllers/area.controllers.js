const { Area, Room, Tenant } = require("../models")

const {paginate} = require('./helper');


//get all data pagination
const  GetAllArea = async (req, res) => {
  try {
    const { limit, offset } = paginate(
      req.query.page || 1,
      req.query.limit || 10
    );

    const { count, rows } = await Area.findAndCountAll({
      offset: offset,
      limit: limit,
      include: [
        {
          model: Room,
          as: "rooms",
          include: [
            {model: Tenant,
            as: "tenants",}
          ],
        },
      ],
    });


    res.status(200).json({
      total: count,
      data: rows,
    })

  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }

}


//create
const CreateArea = async (req,res) => {
  try {
    const { name, address,description, totalRooms,totalFloors } = req.body;

    const formData = {
      name, address,description, totalRooms,totalFloors, userId: 2
    };

    const created = await Area.create(formData);

    res.status(200).json(created);

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//edit
const EditArea =  async(req,res) => {
  try {
    const { name, address,description, totalRooms,totalFloors, userId } = req.body;

    const id = req.params.id;

    const area = await Area.update(
      {
        name, address,description, totalRooms,totalFloors, userId: 2
      },
      {
        where: {
          id
        }
      }
    );

    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//delete
const DeleteArea = async (req,res) => {
  try {
    const id = req.params.id;

    await Area.destroy({
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


module.exports= {GetAllArea, CreateArea, EditArea, DeleteArea} 