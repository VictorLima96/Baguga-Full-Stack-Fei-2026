# Portfólio - Victor Lima

Site dos Labs de desenvolvimento web da FEI (2026). O servidor e as páginas do site ficam nesta pasta `Portfolio`. As pastas `Aula ...` continuam na raiz do repositório como material de estudo, e o site também consegue abrir essas páginas.

## Como rodar

1. Abra o terminal na pasta `Portfolio`.
2. Rode `npm install` uma vez para baixar o Express e o EJS.
3. Rode `npm start`.
4. Abra `http://localhost/` no navegador.

Se a porta 80 estiver ocupada ou pedir permissão de Administrador, dá para testar em outra porta:

```powershell
$env:PORT=8080
npm start
```

Depois acesse `http://localhost:8080/`. A entrega continua usando a porta 80, que é o padrão do `server.js`.

## Acessar de outro computador

1. No computador que está rodando o servidor, abra o PowerShell e digite `ipconfig`.
2. Procure o **Endereço IPv4** da rede (algo como `192.168.0.10`).
3. No outro computador, que precisa estar na mesma rede, acesse `http://IP-DO-SERVIDOR/`.

O servidor escuta em `0.0.0.0`, então aceita conexões da rede. Se não abrir, confira o Firewall do Windows e permita o Node.js em redes privadas.

## Rotas principais

| Endereço | Página |
| --- | --- |
| `/` | `projects.html` (pedido do Lab 8) |
| `/Home.html` | `index.html` (pedido do Lab 7) |
| `/Project.html` | `projects.html` (pedido do Lab 7) |
| `/cadastra` | `Cadastro.html` |
| `/login` | `Login.html` |

As aulas também ficam disponíveis em `/aulas/aula-01/`, `/aulas/aula-02/` e assim por diante. Os simulados ficam em `/simulado/flexbox/`, `/simulado/grid/` e `/simulado/meu-fazido/`. O jogo extra fica em `/extras/jogo-kniggles/`.

## Labs e Aulas

- **Labs**: entregas que valem nota (`Lab 1` até `Lab 8`). As páginas do site estão em `Portfolio/public`.
- **Aulas**: exercícios feitos em sala (`Aula 01` até `Aula 09`). Ficam nas pastas da raiz e são abertos pelo menu de projetos do site.

A tabela de `projects.html` tem uma parte só para os Labs e outra só para as Aulas, para não misturar as entregas com os exercícios de sala.

## Checklist dos requisitos

### Lab 1 - Página inicial

- [x] `index.html` com `<h1>` com o nome.
- [x] Parágrafos `<p>` com informações.
- [x] Lista com os estudos do semestre.
- [x] Mais de 5 imagens.
- [x] 3 links externos (FEI, LinkedIn e GitHub).
- [x] 3 iframes, incluindo 1 mapa do Google Maps.

### Lab 2 - Esqueleto do site

- [x] Menu com links em todas as páginas.
- [x] `<h1>` em todas as páginas.
- [x] Tabela em `projects.html` com as colunas "Nome do Projeto" e "Link do projeto".
- [x] CSS externo em `bungas.css`.
- [x] Seletores de tag, classe e id.
- [x] Pseudo-classes `:hover`.

### Lab 3 - Copiando um modelo

- [x] Linha "Copiando um modelo" na tabela.
- [x] Página `copy.html` com o conteúdo do `info.txt`.
- [x] Fundo, fontes, cores e posicionamento seguindo a `referencia.jpeg`.

### Lab 4 - Adivinhação

- [x] Linha "Adivinhação" na tabela.
- [x] Página `guess.html` com `<input>`.
- [x] Fundo escuro e elementos centralizados.
- [x] `Math.random()` e `Math.floor()` para sortear o número.
- [x] `if` para verificar se o palpite é maior, menor ou igual.
- [x] `document.getElementById(...).style.setProperty("background-color", "red")` quando o usuário erra.

### Lab 5 - Canvas

- [x] Linha "Canvas" na tabela.
- [x] Página `Canvas.html` com canvas de 300 x 300.
- [x] Fundo e centralização no CSS.
- [x] Funções `desenhar_quadrado`, `desenhar_linha`, `desenhar_arco` e `escrever`.
- [x] Figura montada usando as funções.

### Lab 6 - Animação

- [x] Linha "Animação" na tabela.
- [x] Página `Animation.html` com canvas de 300 x 300.
- [x] Fundo e centralização no CSS.
- [x] Imagem controlada pelo mouse.
- [x] Ponteiro centralizado na imagem.
- [x] Imagem limitada dentro do canvas, mesmo quando o mouse sai.

### Lab 7 - Servidor estático

- [x] Servidor Express na porta 80.
- [x] Todas as páginas do site servidas pelo Express.
- [x] Acesso pela rede usando o IP do computador.

### Lab 8 - Get, Post e Template

- [x] Linha "Get - Post - Template" na tabela.
- [x] Páginas `Cadastro.html` e `Login.html` com CSS centralizado.
- [x] Servidor Express na porta 80.
- [x] `/` abre a página de projetos.
- [x] `/cadastra` abre o cadastro e recebe o POST do formulário.
- [x] `/login` abre o login e recebe o POST do formulário.
- [x] Página dinâmica `views/resposta.ejs` mostrando o status do cadastro/login.

Os usuários ficam guardados na memória do servidor. Se reiniciar o Node.js, é preciso cadastrar de novo.
