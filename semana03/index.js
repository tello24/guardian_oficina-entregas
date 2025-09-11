// index.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Servir arquivos estáticos da pasta public/
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],     // permite /home resolver para home.html se existir
  maxAge: '1h',             // cache leve (opcional)
}));

// Raiz: entrega a sua interface
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// (Opcional) saúde do serviço
app.get('/status', (_req, res) => {
  res.send('OK');
});

// Endpoints do CTF
app.post('/postExample', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'Dados inválidos: informe name e email.' });
  }
  return res.json({ message: `Recebido! Nome: ${name}, Email: ${email}` });
});

app.post('/submitForm', (req, res) => {
  const { nome, mensagem } = req.body || {};
  if (!nome || !mensagem) {
    return res.status(400).json({ message: 'Preencha nome e mensagem.' });
  }
  return res.json({ message: `Mensagem recebida de ${nome}: ${mensagem}` });
});

app.listen(port, () => {
  console.log(`API Iniciada na porta ${port}! http://localhost:${port}`);
});
