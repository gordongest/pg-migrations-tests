const request = require('supertest');
const app = require('../../server/app');
const pool = require('../../server/pool');
const UsersRepo = require('../../server/repos/UsersRepo');
const Context = require('../context')

let context;

beforeAll(async () => {
  context = await Context.build();
});

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