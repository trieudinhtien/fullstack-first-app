const express = require('express');
const { GetHomePage } = require('../controllers/home.controllers');
const { Register, Login, GetAllUsers, UpdateUser, DeleteUser, UpdateAvatar } = require('../controllers/auth.controllers');
const {verifyToken} = require('../middlewares/auth.middleware');


const router = express.Router()


//get
router.get('/user',verifyToken, GetAllUsers)

//post
router.post('/v1/api/register', Register);
router.post('/v1/api/login', Login);
router.put('/v1/api/users/:id',verifyToken, UpdateUser);
router.delete('/v1/api/users/:id',verifyToken, DeleteUser);
router.patch('/v1/api/avatar/:id',verifyToken, UpdateAvatar);








module.exports = router