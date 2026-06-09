const express = require('express');
const { GetHomePage } = require('../controllers/home.controllers');
const { Register, Login, GetAllUsers } = require('../controllers/auth.controllers');

const router = express.Router()


//get
router.get('/', GetHomePage)
router.get('/user', GetAllUsers)




//post

router.post('/v1/api/register', Register);
router.post('/v1/api/login', Login);



module.exports = router