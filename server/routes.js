const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserControllers');

router.get('/', UserController.test)

router.get('/users', UserController.find)

router.get('/users/:id', UserController.findById)

router.post('/users', )

router.put('/users/:id', )

router.delete('/users/:id', )

module.exports = router;