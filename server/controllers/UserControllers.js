const dedent = require('dedent');
const pool = require('../pool');
const toCamelCase = require('../utils/toCamelCase');

class UserController {
  static test(req, res) {
    console.log('DING');
    res.send("i'm awake");
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT *
      FROM users
      ORDER BY id;
      `
    );

    return toCamelCase(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id = $1
      LIMIT 1;
      `,
      [id]
    );

    return toCamelCase(rows)[0];
  }

  static async insertUser(username, bio) {
    const { rows } = await pool.query(`
      INSERT INTO users (username, bio)
      VALUES ($1, $2)
      RETURNING *;
      `, [username, bio]
    );

    return toCamelCase(rows)[0];
  }

  static async updateUser(id, username, bio) {
    const { rows } = await pool.query(`
      UPDATE users
      SET username = $1, bio = $2
      WHERE id = $3
      RETURNING *;
      `, [username, bio, id]
    );

    return toCamelCase(rows)[0];
  }

  static async deleteUser(id) {
    const { rows } = await pool.query(`
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
      `, [id]
    );

    return toCamelCase(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query(`
      SELECT COUNT (*)
      FROM users;
    `);

    return rows[0].count;
  }
}

module.exports = UserController;