const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post('/api/register',userController.createUser);
router.post('/api/login', userController.loginUser);
router.get('/api/users', userController.getAllUser);
router.get('/api/user/:user_id', userController.getUserById)
router.patch('/api/user/:user_id', userController.updateUserById)
router.delete('/api/user/:user_id', userController.deleteUserById)

module.exports = router;

