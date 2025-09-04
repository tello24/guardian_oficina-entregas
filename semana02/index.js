const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get(`/`, (req, res) => {
    res.send('Eike viado!');
});

app.get(`/home`, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');  
});

// POST exemplo
app.post(`/postExample`, (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `Recebido! Nome: ${name}, Email: ${email}` });
});

app.post(`/submitForm`, (req, res) => {
    const { nome, mensagem } = req.body;
    res.json({ message: `Mensagem recebida de ${nome}: ${mensagem}` });
});

app.listen(port, () => {
    console.log(`API Iniciada na porta ${port}!`);
});
