# Baguga Full Stack FEI 2026

Repositório com as atividades de desenvolvimento web da FEI. A entrega dos Labs fica separada do material de aula para não misturar as coisas.

## Estrutura

- `Labs/` - site completo e servidor Express dos Labs 1 a 8. É esta pasta que deve ser enviada no Moodle.
- `Labs/Referencias/` - arquivos originais de referência do Lab 3 e do Lab 4.
- `Aulas/` - exercícios feitos em sala (Aula 01 até Aula 09).
- `Extras/` - simulados e o jogo do Kniggles, que não fazem parte da entrega dos Labs.

## Entrega

O link para enviar no Moodle é:

```text
https://github.com/VictorLima96/Baguga-Full-Stack-Fei-2026/tree/main/Labs
```

O site é cumulativo: os Labs 1 a 8 compartilham as mesmas páginas e o mesmo servidor. Por isso o código fica todo em `Labs/`, com a tabela de `projects.html` e o `Labs/README.md` mostrando o que pertence a cada Lab.

## Rodar o site

```powershell
cd Labs
npm install
npm start
```

Depois acesse `http://localhost/`. Para acessar de outro computador da rede, use o IPv4 do computador que está rodando o servidor (veja com `ipconfig`).
