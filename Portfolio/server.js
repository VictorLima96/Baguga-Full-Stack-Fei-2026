const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT || 80);
const publicRoot = path.join(__dirname, "public");
const repoRoot = path.join(__dirname, "..");

let usuarios = [];

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  res.sendFile(path.join(publicRoot, "projects.html"));
});

app.get("/Home.html", function (req, res) {
  res.sendFile(path.join(publicRoot, "index.html"));
});

app.get("/Project.html", function (req, res) {
  res.sendFile(path.join(publicRoot, "projects.html"));
});

app.get("/cadastra", function (req, res) {
  res.sendFile(path.join(publicRoot, "Cadastro.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(publicRoot, "Login.html"));
});

app.post("/cadastra", function (req, res) {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const email = req.body.email;
  const senha = req.body.senha;

  if (!nome || !sobrenome || !email || !senha) {
    res.render("resposta.ejs", {
      status: "Cadastro não realizado",
      mensagem: "Preencha todos os campos.",
      nome: ""
    });
    return;
  }

  usuarios.push({
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    senha: senha
  });

  console.log("Usuário cadastrado: " + email);

  res.render("resposta.ejs", {
    status: "Cadastro realizado com sucesso",
    mensagem: "Agora você já pode fazer login.",
    nome: nome
  });
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const senha = req.body.senha;
  let encontrado = null;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email && usuarios[i].senha === senha) {
      encontrado = usuarios[i];
    }
  }

  if (encontrado === null) {
    res.render("resposta.ejs", {
      status: "Login não realizado",
      mensagem: "Email ou senha incorretos.",
      nome: ""
    });
    return;
  }

  res.render("resposta.ejs", {
    status: "Login realizado com sucesso",
    mensagem: "Bem-vindo de volta!",
    nome: encontrado.nome
  });
});

app.use(express.static(publicRoot));

app.use("/aulas/aula-01", express.static(path.join(repoRoot, "Aula 01")));
app.use("/aulas/aula-02", express.static(path.join(repoRoot, "Aula 02")));
app.use("/aulas/aula-03", express.static(path.join(repoRoot, "Aula 03")));
app.use("/aulas/aula-03-5", express.static(path.join(repoRoot, "Aula 03.5", "Aula 03")));
app.use("/aulas/aula-04", express.static(path.join(repoRoot, "Aula 04")));
app.use("/aulas/aula-05", express.static(path.join(repoRoot, "Aula 05")));
app.use("/aulas/aula-06", express.static(path.join(repoRoot, "Aula 06")));
app.use("/aulas/aula-07", express.static(path.join(repoRoot, "Aula 07")));
app.use("/aulas/aula-08", express.static(path.join(repoRoot, "Aula 08")));
app.use("/aulas/aula-09", express.static(path.join(repoRoot, "Aula 09")));

app.use("/simulado/flexbox", express.static(path.join(repoRoot, "Simulado", "Modelo-Flexbox")));
app.use("/simulado/grid", express.static(path.join(repoRoot, "Simulado", "Modelo-Grid")));
app.use("/simulado/meu-fazido", express.static(path.join(repoRoot, "Simulado", "Meu fazido")));
app.use("/extras/jogo-kniggles", express.static(path.join(repoRoot, "testo")));

app.use(function (req, res) {
  res.status(404).send('Página não encontrada. <a href="/Project.html">Ver projetos</a>');
});

const servidor = app.listen(port, "0.0.0.0", function () {
  console.log("Servidor rodando na porta " + port);
  console.log("Neste computador: http://localhost/");
  console.log("Na rede: http://SEU-IP/ (descubra com ipconfig)");
});

servidor.on("error", function (erro) {
  console.log("Erro ao iniciar o servidor: " + erro.message);

  if (erro.code === "EACCES" || erro.code === "EADDRINUSE") {
    console.log("A porta 80 pode estar ocupada ou precisar de permissão de Administrador.");
  }
});
