const dedent = require('dedent');
const pool = require('../pool');
const toCamelCase = require('../utils/toCamelCase');

class UserController {
  static test(req, res) {
    console.log('DING');
    res.send('i\'m awake');
  }

  static async find(req, res) {
    const { rows } = await pool.query(`
      SELECT *
      FROM users;
    `);

    res.send(toCamelCase(rows));
  }

  static async findById(req, res) {

  }

  static async insert(req, res) {

  }

  static async update(req, res) {

  }

  static async delete(req, res) {

  }
}

module.exports = UserController;