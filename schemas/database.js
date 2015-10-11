module.exports = require('thinky')({
  host: process.env.RETHINKDB_PORT_28015_TCP_ADDR,
  port: process.env.RETHINKDB_PORT_28015_TCP_PORT,
  db: '',
  authKey: '',
  max: 10,
});
