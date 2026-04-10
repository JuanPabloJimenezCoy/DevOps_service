const express = require('express');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Login simulado
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const demoUser = "admin";
  const demoPass = "1234";

  if (username === demoUser && password === demoPass) {
    res.sendFile(path.join(__dirname, 'views', 'succes.html'));
  } else {
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
  }
});

// Servidor (CORREGIDO PARA AWS)
const PORT = 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});