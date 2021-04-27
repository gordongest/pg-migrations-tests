const express = require('express');
const router = express.Router();
const UsersRepo = require('./repos/UsersRepo');

router.get('/', (req, res) => {
  res.send(UsersRepo.test())
});

router.get('/count', async (req, res) => {
  const result = await UsersRepo.count();

  res.send(result);
});

router.get('/users', async (req, res) => {
  const users = await UsersRepo.find();

  res.send(users);
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UsersRepo.findById(id);

  res.send(user);
});

router.post('/users', async (req, res) => {
  const { username, bio } = req.body;

  const result = await UsersRepo.insertUser(username, bio);

  res.status(201).send(result);
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  const result = await UsersRepo.updateUser(id, username, bio);

  res.send(result);
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const result = await UsersRepo.deleteUser(id);

  res.send(result);
});

module.exports = router;
