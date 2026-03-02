const express = require('express');
const mysql = require('mysql');
const _ = require('lodash');
const minimist = require('minimist');

const app = express();
app.use(express.json());

// 🔴 Credenciales hardcodeadas (vulnerabilidad)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'test'
});

// 🔴 Endpoint vulnerable a SQL Injection
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = '" 
                + username + 
                "' AND password = '" 
                + password + "'";

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => {
  console.log('Servicio vulnerable corriendo en puerto 3001');
});