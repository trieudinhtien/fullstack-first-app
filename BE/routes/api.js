const express = require('express');
const { GetHomePage } = require('../controllers/home.controllers');
const { Register, Login, GetAllUsers, UpdateUser, DeleteUser, UpdateAvatar } = require('../controllers/auth.controllers');
const {GetAllArea, CreateArea, EditArea, DeleteArea} = require('../controllers/area.controllers')

const {GetAllRooms, GetDetailRooms, GetRoomsByArea} = require('../controllers/room.controllers')

const {verifyToken} = require('../middlewares/auth.middleware');


const router = express.Router()


// auth
router.get('/user',verifyToken, GetAllUsers)
router.post('/v1/api/register', Register);
router.post('/v1/api/login', Login);
router.put('/v1/api/users/:id',verifyToken, UpdateUser);
router.delete('/v1/api/users/:id',verifyToken, DeleteUser);
router.patch('/v1/api/avatar/:id',verifyToken, UpdateAvatar);



//area (khu tro)
router.get('/v1/api/area',verifyToken, GetAllArea)
router.post('/v1/api/area', verifyToken, CreateArea);
router.put('/v1/api/area/:id', verifyToken, EditArea);
router.delete('/v1/api/area/:id', verifyToken, DeleteArea);

//room

router.get('/v1/api/rooms',verifyToken, GetAllRooms)
router.get('/v1/api/rooms/:id',verifyToken, GetDetailRooms);

router.get('/v1/api/rooms/:id/area', verifyToken, GetRoomsByArea);

// router.post('/v1/api/rooms', verifyToken, CreateRooms);
// router.put('/v1/api/rooms/:id', verifyToken, EditRooms);
// router.delete('/v1/api/rooms/:id', verifyToken, DeleteRooms);









module.exports = router