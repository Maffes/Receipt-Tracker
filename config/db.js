const mongoose = require('mongoose')

// Connects server to MongoDB

const connectDB = async () => {
  try {
    // Attempts to connect using MONGO_URI variable in .env file
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected: ${connect.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB