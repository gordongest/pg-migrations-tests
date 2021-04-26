const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserControllers');

router.get('/', UserController.test)

router.get('/users', UserController.find)

router.get('/users/:id', UserController.findById)

router.post('/users', UserController.insertUser)

router.put('/users/:id', UserController.updateUser)

router.delete('/users/:id', UserController.deleteUser)

module.exports = router;