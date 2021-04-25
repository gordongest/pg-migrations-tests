const pg = require('pg');

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query(`SELECT 'hello, there' AS greeting;`);
  }
}

module.exports = new Pool();
