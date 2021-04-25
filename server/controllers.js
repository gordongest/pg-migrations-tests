const pool = require('./pool');

const dbConfig = { connectionString: process.env.DATABASE_URL }

pool.connect(dbConfig);

module.exports = {
  test(req, res) {
    console.log('DING');
    res.send('i\'m awake');
  },
}