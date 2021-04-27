const request = require('supertest');
const app = require('../../server/app');
const pool = require('../../server/pool');
const UsersRepo = require('../../server/repos/UsersRepo');

const dbConfig = { connectionString: process.env.TEST_DATABASE_URL };

beforeEach(() => {
  return pool
    .connect(dbConfig)
    .then(() => console.log('Connected to PostgreSQL...'));
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

afterAll(() => {
  return pool.close();
});
