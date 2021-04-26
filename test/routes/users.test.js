const request = require('supertest');
const app = require('../../server/app');
const pool = require('../../server/pool')
const UserControllers = require('../../server/controllers/UserControllers');

const dbConfig = { connectionString: process.env.DATABASE_URL };

beforeEach(() => {
  return pool.connect(dbConfig)
    .then(() => console.log('Connected to PostgreSQL...'))
});

it('creates a user', async done => {
  const startCount = await UserControllers.count();
  expect(startCount).toEqual(0);

  await request(app)
    .post('/users')
    .send({ username: 'testUser', bio: 'testBio' })
    .expect(201);

  const endCount = await UserControllers.count();
  expect(endCount).toEqual(1);
});

afterAll(() => {
  return pool.close()
});