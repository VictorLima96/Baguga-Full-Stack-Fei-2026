const express = require("express");
const path = require("path");
const mongo = require("mongodb");

const app = express();
const port = Number(process.env.PORT || 80);
const publicRoot = path.join(__dirname, "public");
const repoRoot = path.join(__dirname, "..");

const MongoClient = mongo.MongoClient;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 3000 });

let lembretesCollection = null;
let usuarios = [];
let lembretesMemoria = [
  {
    titulo: "Beber água",
    descricao: "Lembrar de me hidratar",
    local: "Casa",
    data: "2023-06-02",
    hora: "10:00"
  },
  {
    titulo: "Prova de WEB",
    descricao: "Fazer a prova da melhor disciplina. Eu estudei bastante para passar ;)",
    local: "FEI",
    data: "2023-06-02",
    hora: "14:00"
  },
  {
    titulo: "Bombom",
    descricao: "Lembrar de dar um bombom para o professor (isso não vai me ajudar a passar mas vai deixar ele feliz :D )",
    local: "FEI",
    data: "2023-06-09",
    hora: "13:40"
  }
];

async function obterColecaoLembretes() {
  if (lembretesCollection !== null) {
    return lembretesCollection;
  }

  await client.connect();
  const dbo = client.db("bd_lembretes");
  lembretesCollection = dbo.collection("lembretes");
  console.log("Conectado ao MongoDB em: " + mongoUri);
  return lembretesCollection;
}

obterColecaoLembretes().catch(function (erro) {
  console.log("Aviso: MongoDB ainda não conectado (" + erro.message + "). Usando lista em memória até o banco subir.");
});

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

app.get("/lembretes", function (req, res) {
  res.render("home.ejs", {
    tituloPagina: "Cadastre um novo lembrete",
    categorias: ["Tarefas", "Reuniões", "Compromissos"]
  });
});

app.get("/home", function (req, res) {
  res.redirect("/lembretes");
});

app.post("/cadastrar_lembrete", async function (req, res) {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const local = req.body.local;
  const data = req.body.data;
  const hora = req.body.hora;

  if (!titulo || !descricao || !local || !data || !hora) {
    res.render("resposta.ejs", {
      modo: "cadastro_lembrete",
      mensagem: "Erro: preencha todos os campos do lembrete."
    });
    return;
  }

  const novoLembrete = {
    titulo: titulo,
    descricao: descricao,
    local: local,
    data: data,
    hora: hora
  };

  try {
    const colecao = await obterColecaoLembretes();
    await colecao.insertOne(novoLembrete);
    console.log("Lembrete salvo no MongoDB: " + titulo);
  } catch (erro) {
    lembretesCollection = null;
    lembretesMemoria.push(novoLembrete);
    console.log("MongoDB indisponível, lembrete salvo em memória: " + erro.message);
  }

  res.render("resposta.ejs", {
    modo: "cadastro_lembrete",
    mensagem: "Lembrete cadastrado com sucesso!"
  });
});

app.get("/listar_lembretes", async function (req, res) {
  let lista = [];

  try {
    const colecao = await obterColecaoLembretes();
    lista = await colecao.find({}).toArray();
  } catch (erro) {
    lembretesCollection = null;
    lista = lembretesMemoria;
    console.log("MongoDB indisponível, exibindo lembretes em memória: " + erro.message);
  }

  res.render("resposta.ejs", {
    modo: "lista_lembretes",
    lembretes: lista
  });
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

app.use("/aulas/aula-01", express.static(path.join(repoRoot, "Aulas", "Aula 01")));
app.use("/aulas/aula-02", express.static(path.join(repoRoot, "Aulas", "Aula 02")));
app.use("/aulas/aula-03", express.static(path.join(repoRoot, "Aulas", "Aula 03")));
app.use("/aulas/aula-03-5", express.static(path.join(repoRoot, "Aulas", "Aula 03.5", "Aula 03")));
app.use("/aulas/aula-04", express.static(path.join(repoRoot, "Aulas", "Aula 04")));
app.use("/aulas/aula-05", express.static(path.join(repoRoot, "Aulas", "Aula 05")));
app.use("/aulas/aula-06", express.static(path.join(repoRoot, "Aulas", "Aula 06")));
app.use("/aulas/aula-07", express.static(path.join(repoRoot, "Aulas", "Aula 07")));
app.use("/aulas/aula-08", express.static(path.join(repoRoot, "Aulas", "Aula 08")));
app.use("/aulas/aula-09", express.static(path.join(repoRoot, "Aulas", "Aula 09")));

app.use("/simulado/flexbox", express.static(path.join(repoRoot, "Extras", "Simulado", "Modelo-Flexbox")));
app.use("/simulado/grid", express.static(path.join(repoRoot, "Extras", "Simulado", "Modelo-Grid")));
app.use("/simulado/meu-fazido", express.static(path.join(repoRoot, "Extras", "Simulado", "Meu fazido")));
app.use("/extras/jogo-kniggles", express.static(path.join(repoRoot, "Extras", "testo")));

app.use(function (req, res) {
  res.status(404).send('Página não encontrada. <a href="/Project.html">Ver projetos</a>');
});

const servidor = app.listen(port, "0.0.0.0", function () {
  console.log("Servidor rodando na porta " + port);
  console.log("Neste computador: http://localhost/");
  console.log("Página de lembretes: http://localhost/lembretes");
  console.log("Na rede: http://SEU-IP/ (descubra com ipconfig)");
});

servidor.on("error", function (erro) {
  console.log("Erro ao iniciar o servidor: " + erro.message);

  if (erro.code === "EACCES" || erro.code === "EADDRINUSE") {
    console.log("A porta 80 pode estar ocupada ou precisar de permissão de Administrador.");
  }
});
