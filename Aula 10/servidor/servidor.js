const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..')));

app.get('/iniciar', (req, res) => {
    res.send(`Iniciado! Parametros: ${JSON.stringify(req.query)}`);
});

app.get('/cadastra_get', function(req, res){
    let query = req.query || {};
    let nome = query.nome;
    let sobrenome = query.sobrenome;
    let email = query.email;
    let senha = query.senha;
    res.render('resp.ejs', { nome_template: nome, sobrenome_template: sobrenome });
});

app.post('/cadastra', function(req, res){
    let body = req.body || {};
    let nome = body.nome;
    let sobrenome = body.sobrenome;
    let email = body.email;
    let senha = body.senha;
    res.render('resp.ejs', { nome_template: nome, sobrenome_template: sobrenome });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
