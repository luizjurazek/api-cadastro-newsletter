const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/subscribe', userController.createNewUser)
router.get('/allUsers', userController.getAllUsers)

module.exports = router