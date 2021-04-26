const request = require('supertest');
const app = require('../../server/app');
const UserControllers = require('../../server/controllers/UserControllers');

it('creates a user', async done => {
  const startCount = await UserControllers.count();
  expect(startingCount).toEqual(0);

  await request(app)
    .post('/users')
    .send({ username: 'testUser', bio: 'testBio' })
    .expect(201);

  const endCount = await UserControllers.count();
  expect(endCount).toEqual(1);
});