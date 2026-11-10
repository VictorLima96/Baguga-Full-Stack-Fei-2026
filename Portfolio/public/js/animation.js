const canvasAnimacao = document.getElementById("canvasAnimacao");
const ctxAnimacao = canvasAnimacao.getContext("2d");

const imagem = new Image();
imagem.src = "assets/landscape.svg";

const tamanho = 140;
const metade = tamanho / 2;

let posicaoX = 150;
let posicaoY = 150;

function desenhar_imagem() {
  ctxAnimacao.clearRect(0, 0, 300, 300);
  ctxAnimacao.drawImage(imagem, posicaoX - metade, posicaoY - metade, tamanho, tamanho);
}

function mover_imagem(evento) {
  const area = canvasAnimacao.getBoundingClientRect();
  const escalaX = canvasAnimacao.width / area.width;
  const escalaY = canvasAnimacao.height / area.height;

  posicaoX = (evento.clientX - area.left) * escalaX;
  posicaoY = (evento.clientY - area.top) * escalaY;

  if (posicaoX < metade) {
    posicaoX = metade;
  }

  if (posicaoX > 300 - metade) {
    posicaoX = 300 - metade;
  }

  if (posicaoY < metade) {
    posicaoY = metade;
  }

  if (posicaoY > 300 - metade) {
    posicaoY = 300 - metade;
  }

  desenhar_imagem();
}

canvasAnimacao.addEventListener("mousemove", mover_imagem);
imagem.onload = desenhar_imagem;
