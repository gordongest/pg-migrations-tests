const pool = require('../server/pool');
const { randomBytes } = require('crypto');
const { default : migrate } = require('node-pg-migrate');
const format = require('pg-format');

const dbConfig = { connectionString: process.env.TEST_DATABASE_URL };

class Context {
  constructor(roleName) {
    this._roleName = roleName;
  }

  async reset() {
    return pool.query(`
      DELETE FROM users;
    `);
  }

  static async build() {
    // randomly generate new role name
    const roleName = 'a' + randomBytes(4).toString('hex');

    // create config object
    const testConfig = {
      host: 'localhost',
      port: 5432,
      database: 'socialnetwork-test',
      user: roleName,
      password: roleName
    }

    // connect to PG
    await pool.connect(dbConfig)
      .then(() => console.log('Setting up PostgreSQL...'));

    // create new role with new name
    await pool.query(format(`
      CREATE ROLE %I
      WITH LOGIN PASSWORD %L;`,
      roleName,
      roleName
    ));

    // create new schema with role name
    await pool.query(format(`
      CREATE SCHEMA %I
      AUTHORIZATION %I;`,
      roleName,
      roleName
    ));

    // disconnect from PG
    await pool.close();

    // run migrations
    await migrate({
      schema: roleName,
      direction: 'up',
      log: () => {},
      noLock: true,
      dir: 'migrations',
      databaseUrl: testConfig
    });

    await pool.connect(testConfig)
      .then(() => console.log('Running tests on PostgreSQL...'));

    return new Context(roleName);
  }

  async close() {
    await pool.close();

    await pool.connect(dbConfig);

    await pool.query(format(
      'DROP SCHEMA %I CASCADE;', this._roleName
    ));

    await pool.query(format(
      'DROP ROLE %I;', this._roleName
    ));

    await pool.close();
  }
}

module.exports = Context;