# Portfólio de Victor Lima

Site acadêmico feito para os Labs 1–7 de HTML, CSS, JavaScript, Canvas e Node.js/Express. As pastas `Aula ...`, `Lab ...` e `Simulado` foram mantidas como material de estudo e referência. Nesta pasta, o servidor e as configurações ficam juntos; as páginas e recursos estão dentro de `public`.

## Começo rápido no VS Code

1. Abra a pasta `Portfolio` no VS Code (ou abra o repositório e entre nela pelo terminal integrado com `cd Portfolio`).
2. Abra o terminal integrado com **Ctrl + `** e rode `npm install` uma vez.
3. Rode `npm start` e deixe esse terminal aberto enquanto usa o site.
4. Abra **http://localhost/** no navegador. Para parar o servidor, volte ao terminal e aperte **Ctrl + C**.

## Páginas

- `index.html` — apresentação, imagens, lista, links e incorporações de vídeo/mapa.
- `projects.html` — catálogo dos projetos e atividades.
- `copy.html` — reprodução do modelo C++ e Java do Lab 3.
- `guess.html` — jogo de adivinhação de 0 a 99.
- `canvas.html` — desenho em Canvas 300 × 300.
- `animation.html` — ilustração que acompanha o ponteiro dentro do Canvas.

## Instalar e iniciar no Windows

1. Instale Node.js LTS.
2. Abra o PowerShell na pasta `Portfolio` deste repositório.
3. Execute `npm install` para instalar o Express.
4. Execute `npm start` para iniciar o servidor na porta 80.
5. No mesmo computador, abra `http://localhost/`.

O servidor escuta em `0.0.0.0`, portanto outros computadores na mesma rede podem acessar o site. No computador servidor, abra o PowerShell e consulte `ipconfig`; procure o endereço **IPv4** da rede usada. Em outro dispositivo, acesse `http://ENDERECO-IPv4/` (por exemplo, `http://192.168.1.25/`). O dispositivo cliente deve estar na mesma rede.

## Permissão, firewall e porta

- No Windows, a porta 80 pode estar ocupada por outro serviço ou exigir um terminal do PowerShell aberto **como Administrador**. O servidor mostra uma mensagem se não conseguir iniciar. Não encerre serviços do Windows sem saber para que servem.
- Se o Windows Defender Firewall perguntar, permita Node.js apenas em redes privadas confiáveis. Se a solicitação não aparecer e o acesso remoto falhar, peça ao responsável pelo computador/rede para liberar conexões TCP de entrada na porta 80 para a rede privada.
- Para testar sem privilégios de administrador, use uma porta alta temporária. No PowerShell: `$env:PORT=8080; npm start`. Acesse `http://localhost:8080/` ou `http://IP-IPv4:8080/`. Feche e abra um novo terminal para voltar ao padrão (porta 80). O requisito de entrega continua sendo a porta 80.
- O acesso externo pode ser bloqueado pela rede, VPN ou firewall corporativo. Evite expor este servidor à internet pública.

## Atalhos compatíveis

Além das páginas em minúsculas, `/Home.html` abre a página inicial e `/Project.html` abre a lista de projetos, como nos exemplos do enunciado.

## Observações

Os vídeos e o mapa são carregados de serviços externos e precisam de conexão com a internet; se algum provedor bloquear a incorporação, os demais itens do site continuam disponíveis. As imagens servidas pelo portfólio ficam em `public/assets`; as referências originais continuam nas pastas de aula.
