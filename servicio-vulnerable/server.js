const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'test'
});

// Página principal
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>VANKO</title>
        <style>
          body {
            font-family: Arial;
            background: linear-gradient(to right, #1e3c72, #2a5298);
            color: white;
            text-align: center;
            margin-top: 100px;
          }
          .card {
            background: white;
            color: black;
            width: 300px;
            margin: auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          }
          input {
            width: 90%;
            padding: 8px;
            margin: 5px 0;
          }
          button {
            padding: 8px 15px;
            background: #1e3c72;
            color: white;
            border: none;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>BIENBENIDO AL VANKO</h1>
        <div class="card">
          <h3>Login</h3>
          <form method="POST" action="/login">
            <input name="Usuario" placeholder="Usuario" required /><br/>
            <input name="Contraseña" type="password" placeholder="Contraseña" required /><br/>
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// SQL Injection
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = '" 
                + username + 
                "' AND password = '" 
                + password + "'";

  connection.query(query, (err, results) => {
    if (err) {
      res.send("Error en la consulta (normal si no tienes MySQL)");
    } else {
      res.send("Login ejecutado (vulnerable a SQL Injection)");
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor vulnerable corriendo en puerto 3001');
});