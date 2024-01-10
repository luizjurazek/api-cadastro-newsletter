const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/subscribe', userController.createNewUser)
router.get('/allUsers', userController.getAllUsers)
router.get('/userById', userController.getUserById)
router.delete('/deleteUserById', userController.deleteUserById)

module.exports = router