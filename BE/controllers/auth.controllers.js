const { User } = require("../models");

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

const Login = (req, res) => {
  console.log('req login:', req.body);
  
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