const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/UserControllers');

router.get('/', UserControllers.test);

router.get('/count', async (req, res) => {
  const result = await UserControllers.count();

  res.send(result);
});

router.get('/users', async (req, res) => {
  const users = await UserControllers.find();

  res.send(users);
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UserControllers.findById(id);

  res.send(user);
});

router.post('/users', async (req, res) => {
  const { username, bio } = req.body;

  const result = await UserControllers.insertUser(username, bio);

  res.status(201).send(result);
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  const result = await UserControllers.updateUser(id, username, bio);

  res.send(result);
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const result = await UserControllers.deleteUser(id);

  res.send(result);
});

module.exports = router;
