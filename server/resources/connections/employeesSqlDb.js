const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'testuser',
    database: 'crudemployeesdb',
    password:'Password1!'
  });
   
 module.exports = connection 