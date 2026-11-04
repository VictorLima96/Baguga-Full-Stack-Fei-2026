const express = require('express');
const path = require('node:path');

const app = express();
const port = Number(process.env.PORT || 80);
const publicRoot = path.join(__dirname, 'public');

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT precisa ser um número entre 1 e 65535.');
  process.exit(1);
}

app.disable('x-powered-by');
app.get('/Home.html', (_request, response) => response.sendFile(path.join(publicRoot, 'index.html')));
app.get('/Project.html', (_request, response) => response.sendFile(path.join(publicRoot, 'projects.html')));
app.use(express.static(publicRoot, { extensions: ['html'], index: 'index.html' }));
app.use((request, response) => {
  response.status(404).send('Página não encontrada. <a href="/">Voltar ao início</a>');
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Portfólio disponível em http://localhost:${port}`);
  console.log('Para acesso na rede, use http://<IP-IPv4-do-computador>/.');
});

server.on('error', (error) => {
  console.error('Não foi possível iniciar o servidor:', error.message);
  if (error.code === 'EACCES') {
    console.error('A porta 80 pode exigir permissões de administrador no Windows.');
  } else if (error.code === 'EADDRINUSE') {
    console.error(`A porta ${port} já está sendo usada. Feche o outro serviço ou defina PORT para teste.`);
  }
  process.exit(1);
});
