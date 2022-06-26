const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors');
const { redirect } = require('express/lib/response');
const path = require('path')
//Access port from env variables or number
const port = process.env.PORT || 3000

//Calls db module in config folder to connect to the database
connectDB()

// Init express and listen for port
const app = express()
app.listen(port, () => console.log(`Sever running on port: ${port}`))
app.use(cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000/']}))

app.use(express.static('uploads'))


app.use(express.static(path.join(__dirname, 'public')));


app.get('/login', (req, res) => res.sendFile(__dirname + '/public/index.html'))
app.get('/register', (req, res) => res.sendFile(__dirname + '/public/index.html'))
app.get('/edit/*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
app.get('/view/*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
// Middleware to use body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// If receipts is called, directs to specified controller
app.use('/api/receipts', require('./routes/receiptRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//Middleware to set error handler message
app.use(errorHandler)

