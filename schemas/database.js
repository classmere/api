module.exports = require('thinky')({
  host: process.env.RETHINK_HOST,
  port: process.env.RETHINK_PORT,
  db: process.env.RETHINK_DB,
  authKey: process.env.RETHINK_KEY,
  max: 10,
});
