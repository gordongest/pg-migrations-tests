const app = require('./app.js');
const pool = require('./pool');

const PORT = process.env.PORT;
const dbConfig = { connectionString: process.env.DATABASE_URL };

pool.connect(dbConfig)
  .then(res => {
    console.log(res.rows[0].greeting);
    app().listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    });
  })
  .catch(err => console.error(err.message));
