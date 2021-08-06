const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql')
var connection = mysql.createConnection(config)

var sql = `CREATE TABLE IF NOT EXISTS people(
            id int primary key auto_increment,
            name VARCHAR(255) not null
          )`;
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
  var connection = mysql.createConnection(config)
  sql = `INSERT INTO people(name) values('Guil')`
  connection.query(sql)
  sql = `SELECT * FROM people`

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    results = JSON.parse(JSON.stringify(results))
    res.write('<h1>Full Cycle</h1>')
    Object.entries(results).forEach(([key, value]) => {
      res.write('<p>'+`${value['name']}`+'</p>');
    });
    res.end()
  });

  connection.end()
})

app.listen(port, ()=> {
  // console.log(port)
})
