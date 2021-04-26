const dedent = require('dedent');
const pool = require('../pool');
const toCamelCase = require('../utils/toCamelCase');

class UserController {
  static test(req, res) {
    console.log('DING');
    res.send("i'm awake");
  }

  static async find(req, res) {
    const { rows } = await pool.query(`
      SELECT *
      FROM users;
    `);

    res.send(toCamelCase(rows));
  }

  static async findById(req, res) {
    const { id } = req.params;

    const { rows } = await pool.query(`
      SELECT *
      FROM users
      WHERE id = $1
      LIMIT 1;
      `, [id]
    );

    res.send(toCamelCase(rows)[0]);
  }

  static async insertUser(req, res) {
    const { username, bio } = req.body;

    const { rows } = await pool.query(`
      INSERT INTO users (username, bio)
      VALUES ($1, $2)
      RETURNING *;
      `, [username, bio]
    );

    res.status(201).send(toCamelCase(rows)[0]);
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { username, bio } = req.body;

    const { rows } = await pool.query(`
      UPDATE users
      SET username = $1, bio = $2
      WHERE id = $3
      RETURNING *
    `, [username, bio, id]
    );

    res.send(toCamelCase(rows)[0]);
  }

  static async deleteUser(req, res) {}
}

module.exports = UserController;
