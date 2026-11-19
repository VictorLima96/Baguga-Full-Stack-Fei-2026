# Guia Rápido: Como Rodar o Servidor e Conectar ao MongoDB Compass

Este documento explica passo a passo como iniciar o projeto da pasta `Labs` (ou um projeto separado na hora da atividade) e conectar ao banco de dados usando o **MongoDB Compass**.

---

## 1. Como rodar o servidor Node.js / Express

1. Abra o terminal (**CMD** ou **PowerShell**) dentro da pasta `Labs`:
   ```powershell
   cd C:\Users\victos\Music\Baguga-Full-Stack-Fei-2026\Labs
   ```
   *(Na FEI, caso tenha extraído o projeto em `Documentos`, entre na pasta correspondente com `cd`).*

2. Instale as dependências do `package.json` (caso a pasta `node_modules` ainda não exista):
   ```powershell
   npm install
   ```
   > **Dica para projeto novo do zero:** se na atividade pedirem para criar uma pasta nova do zero sem arquivos extras, rode dentro da pasta nova:
   > ```powershell
   > npm init -y
   > npm install express ejs mongodb
   > ```

3. Inicie o servidor (configurado por padrão na **porta 80**):
   ```powershell
   node server.js
   ```
   *(ou `npm start`)*

4. Acesse no navegador:
   - **Tabela de projetos (`projects.html`):** `http://localhost/` ou `http://localhost/projects.html`
   - **Sistema de Lembretes (`home.ejs`):** `http://localhost/lembretes`

   > **Observação importante para prova/atividade:**
   > Caso o enunciado exija que digitar apenas `http://localhost` abra direto o `home.ejs`, basta trocar a rota `app.get("/", ...)` no `server.js` para:
   > ```js
   > app.get("/", function (req, res) {
   >   res.render("home.ejs", {
   >     tituloPagina: "Cadastre um novo lembrete",
   >     categorias: ["Tarefas", "Reuniões", "Compromissos"]
   >   });
   > });
   > ```

   > **Se a porta 80 der erro (`EACCES` ou `EADDRINUSE`):**
   > - Abra o VS Code ou o Prompt de Comando como **Administrador**, ou verifique se o Apache/IIS não está ocupando a porta 80.
   > - Para testar rapidamente em outra porta (ex.: 3000), rode no PowerShell:
   >   ```powershell
   >   $env:PORT=3000; node server.js
   >   ```
   >   e acesse `http://localhost:3000/lembretes`.

---

## 2. Como conectar ao Banco de Dados com o MongoDB Compass

### Opção A — Banco Local no computador do laboratório (mais comum com MongoDB Compass)

1. Abra o **MongoDB Compass** no computador.
2. Na tela inicial (**New Connection**), verifique o campo **URI**:
   - Por padrão ele já vem preenchido com:
     ```text
     mongodb://localhost:27017
     ```
     ou
     ```text
     mongodb://127.0.0.1:27017
     ```
   *(Prefira `mongodb://127.0.0.1:27017` no código Node.js, pois evita problemas de IPv6 `::1` no Windows — o `server.js` já está configurado assim por padrão!)*
3. Clique no botão verde **Connect**.
4. Criação do Banco e da Coleção:
   - **Automático:** Assim que você preencher o formulário em `http://localhost/lembretes` e clicar em **Salvar**, o Node.js cria automaticamente o banco **`bd_lembretes`** e a coleção **`lembretes`**.
   - **Manual pelo Compass (opcional):** Você também pode clicar no botão **`+` (Create database)** na barra lateral esquerda do Compass, informar:
     - **Database Name:** `bd_lembretes`
     - **Collection Name:** `lembretes`
     e clicar em **Create Database**.
5. Para conferir os dados salvos:
   - No menu esquerdo do Compass, clique em **`bd_lembretes`** -> **`lembretes`**.
   - Clique no ícone de **Reload / Find** para ver os documentos inseridos pelo formulário!

---

### Opção B — Usando MongoDB Atlas (nuvem), caso necessário

1. No painel do MongoDB Atlas, clique em **Connect -> Drivers** (ou **Compass**) e copie a string de conexão:
   ```text
   mongodb+srv://USUARIO:SENHA@seu-cluster.mongodb.net/
   ```
2. Cole essa mesma URI no **MongoDB Compass** e clique em **Connect** para visualizar os dados.
3. No arquivo `Labs/server.js`, altere a linha `mongoUri` (ou defina a variável de ambiente `MONGO_URI`):
   ```js
   const mongoUri = "mongodb+srv://USUARIO:SENHA@seu-cluster.mongodb.net/";
   ```

---

## 3. Resumo da estrutura do código (como funciona no `server.js`)

1. **Conexão com o banco:**
   ```js
   const mongo = require("mongodb");
   const MongoClient = mongo.MongoClient;

   const mongoUri = "mongodb://127.0.0.1:27017";
   const client = new MongoClient(mongoUri);

   await client.connect();
   const dbo = client.db("bd_lembretes");
   const colecao = dbo.collection("lembretes");
   ```

2. **Salvar dados do formulário (`POST /cadastrar_lembrete` -> `insertOne`):**
   ```js
   await colecao.insertOne({
     titulo: req.body.titulo,
     descricao: req.body.descricao,
     local: req.body.local,
     data: req.body.data,
     hora: req.body.hora
   });
   ```

3. **Buscar dados em lista (`GET /listar_lembretes` -> `find()`):**
   ```js
   const lista = await colecao.find({}).toArray();
   res.render("resposta.ejs", {
     modo: "lista_lembretes",
     lembretes: lista
   });
   ```
