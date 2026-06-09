const { User } = require("../models");
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
  try {
    const {firstName, lastName, email, password, age, country} = req.body; 

    const formData = {
      firstName,
      lastName,
      email,
      password,
      age,
      country, 
    }
    
    const user = await User.create(formData);
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }

 
}

const Login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const formData = {
      email, password,
    }

    const userFindFromDb = await User.findOne({ where: { email: email } })

    if(!userFindFromDb) {
      res.status(401).json({
        error : {
          message: 'Email is not exists.'}
      })
    }

    const isMatchPassword = password === userFindFromDb.password;
    if(!isMatchPassword) {
      res.status(401).json({
        error: {
          message: 'Password is Error!'
        }
      })
    }

    //create token with jwt
    const token = jwt.sign(
      {
        id: userFindFromDb.id,
        email: userFindFromDb.email,
      },
      'secret-token-test',
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: userFindFromDb.id,
        email: userFindFromDb.email,
        lastName: userFindFromDb.lastName,
        firstName: userFindFromDb.firstName,
        age: userFindFromDb.age,
      },
    })
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
  
}


const GetAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  Register, Login, GetAllUsers,
}