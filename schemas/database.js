module.exports = require('thinky')({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  db: process.env.DATABASE_DB,
  authKey: process.env.DATABASE_KEY,
  max: 10,
});
