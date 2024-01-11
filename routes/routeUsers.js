const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/subscribe', userController.subscribeUser)
router.get('/allUsers', userController.getAllUsers)
router.get('/userById', userController.getUserById)
router.delete('/unsubscribeUserById', userController.unsubscribeUserById)
router.patch('/updateUser', userController.updateUser)

module.exports = router