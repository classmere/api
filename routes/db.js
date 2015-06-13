const mysql = require('mysql');
const async = require('async');


exports.connect      = connect;
exports.disconnect   = disconnect;
exports.query        = query;


var connection;


function connect(callback) {
  connection = mysql.createConnection({
    host           : process.env.MYSQL_PORT_3306_TCP_ADDR,
    port           : 3306,
    user           : 'root',
    password       : process.env.MYSQL_ENV_MYSQL_ROOT_PASSWORD,
    database       : 'edubeaver'
  });
}

function query(sqlString, values, callback) {
  connection.query(sqlString, values, callback);
}

function disconnect() {
  connection.end(function (error) {
    if (error) {
      console.error('Error disconnecting from MySQL server: ' + error);
    } else {
      console.log('Disconnected from DB');
    }
  });
}