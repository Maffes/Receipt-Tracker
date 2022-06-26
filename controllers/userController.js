const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



//  Desc: Register a new user | Type: POST /api/users | Access: Public
const registerUser = asyncHandler(async (req,res) => {
  const { firstName, lastName, email, password } = req.body

  //Checks all fields are filled
  if(!firstName || !lastName || !email || !password ) {
    res.status(400)
    throw new Error('Please fill in the required fields')
  }

  //Check if user exists
  const userExists = await User.findOne({email})
  if(userExists) {
    res.status(401)
    throw new Error('User already exists')
  }

  //Encrypt password
  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, salt)

  //Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: encryptedPassword
  })
  if(user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})



//  Desc: Authenticate | Type: POST /api/users/login | Access: Public
const authenticateUser = asyncHandler(async (req,res) => {
  const { email, password } = req.body

  // Check is user exists
  const user = await User.findOne({email})
  // Authenticates user
  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }

})


//  Desc: Get current user | Type: GET /api/users/account | Access: Private
const getCurrentUser = asyncHandler(async (req,res) => {
  const {_id, firstName, lastName, email} = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    email,
  })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}



module.exports = {
  registerUser,
  authenticateUser,
  getCurrentUser
}