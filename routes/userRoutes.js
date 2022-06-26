const express = require('express')
const router = express.Router()
const { registerUser, authenticateUser, getCurrentUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', authenticateUser)
router.get('/account', protect, getCurrentUser)

module.exports = router


