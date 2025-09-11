// topo do arquivo:
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const FLAG = process.env.FLAG || 'flag{ctf_lab_ok}'; // <— flag padrão 

// middlewares:
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// raiz serve a interface:
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PISTA 1: robots.txt indicando um caminho suspeito
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send('User-agent: *\nDisallow: /.well-known/ctf\n');
});

// PISTA 2: arquivo "secreto" com dica em Base64
app.get('/.well-known/ctf', (_req, res) => {
  const dica = 'Dica: use o header X-Admin: true no POST /postExample com role=admin';
  const b64 = Buffer.from(dica, 'utf8').toString('base64');
  res.type('text/plain').send(`Nada para ver aqui.\n${b64}\n`);
});

// ENDPOINT COM SEGREDO: libera a flag se você mandar o cabeçalho e o corpo certos
app.post('/postExample', (req, res) => {
  const { name, email, role } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'Dados inválidos: informe name e email.' });
  }

  const isAdminHeader = String(req.get('x-admin') || '').toLowerCase() === 'true';
  const isAdminBody = role === 'admin';
  const debug = String(req.query.debug || '') === '1';

  // CONDIÇÃO OCULTA: header X-Admin: true + role=admin
  if (isAdminHeader && isAdminBody) {
    res.set('X-Flag', FLAG);                  // flag no HEADER
    if (debug) return res.json({ message: 'GG!', flag: FLAG }); // e (opcional) no corpo
    return res.json({ message: `Recebido! Nome: ${name}, Email: ${email}` });
  }

  // fluxo normal (sem flag)
  return res.json({ message: `Recebido! Nome: ${name}, Email: ${email}` });
});

// mantém seu /submitForm como estava:
app.post('/submitForm', (req, res) => {
  const { nome, mensagem } = req.body || {};
  if (!nome || !mensagem) return res.status(400).json({ message: 'Preencha nome e mensagem.' });
  res.json({ message: `Mensagem recebida de ${nome}: ${mensagem}` });
});

app.listen(port, () => {
  console.log(`API Iniciada na porta ${port}! http://localhost:${port}`);
});