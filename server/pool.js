const pg = require('pg');

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query(`
      SELECT 'hello, there' AS greeting;
    `);
  }

  close() {
    return this._pool.end;
  }

  query(sql) {
    return this._pool.query(sql);
  }
}

module.exports = new Pool();
