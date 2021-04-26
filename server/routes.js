const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/UserControllers');

router.get('/', UserControllers.test)

router.get('/count', UserControllers.count)

router.get('/users', UserControllers.find)

router.get('/users/:id', UserControllers.findById)

router.post('/users', UserControllers.insertUser)

router.put('/users/:id', UserControllers.updateUser)

router.delete('/users/:id', UserControllers.deleteUser)


module.exports = router;