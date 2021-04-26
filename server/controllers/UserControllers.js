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
      FROM users
      ORDER BY id;
      `
    );

    res.send(toCamelCase(rows));
  }

  static async findById(req, res) {
    const { id } = req.params;

    const { rows } = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id = $1
      LIMIT 1;
      `,
      [id]
    );

    rows[0] ?
      res.send(toCamelCase(rows)[0]) :
      res.sendStatus(404);
  }

  static async insertUser(req, res) {
    const { username, bio } = req.body;

    const { rows } = await pool.query(`
      INSERT INTO users (username, bio)
      VALUES ($1, $2)
      RETURNING *;
      `, [username, bio]
    );

    rows[0] ?
      res.status(201).send(toCamelCase(rows)[0]) :
      res.sendStatus(501);
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { username, bio } = req.body;

    const { rows } = await pool.query(`
      UPDATE users
      SET username = $1, bio = $2
      WHERE id = $3
      RETURNING *;
      `, [username, bio, id]
    );

    rows[0] ?
      res.send(toCamelCase(rows)[0]) :
      res.sendStatus(404);
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    const { rows } = await pool.query(`
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
      `, [id]
    );

    rows[0] ?
      res.send(toCamelCase(rows)[0]) :
      res.sendStatus(404);
  }

  static async count(req, res) {
    const { rows } = await pool.query(`
      SELECT COUNT (*)
      FROM users;
    `);

    rows[0] ?
      res.send(rows[0].count) :
      res.sendStatus(500);
  }
}

module.exports = UserController;