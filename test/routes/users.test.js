const request = require('supertest');
const app = require('../../server/app');
const pool = require('../../server/pool');
const UsersRepo = require('../../server/repos/UsersRepo');
const Context = require('../context')

let context;

beforeAll(async () => {
  context = await Context.build();
});

// beforeEach(async () => {
//   await context.reset();
// });

afterAll(() => {
  return context.close();
});

it('creates a user', async () => {
  const startCount = await UsersRepo.count();

  await request(app)
    .post('/users')
    .send({ username: 'testUser', bio: 'testBio' })
    .expect(201);

  const endCount = await UsersRepo.count();

  expect(endCount - startCount).toEqual(1);
});

it('updates a user', async () => {
  // await request(app)
  //   .post('/users')
  //   .send({ username: 'testUser', bio: 'testBio' })
  //   .expect(201);

  await request(app)
    .put('/users/1')
    .send({ username: 'testUser', bio: 'updatedBio' })
    .expect(200);

  const users = await UsersRepo.find();

  expect(users[0].bio).toEqual('updatedBio');
})