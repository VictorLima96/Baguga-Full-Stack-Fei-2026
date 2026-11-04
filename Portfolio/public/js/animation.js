const animationCanvas = document.getElementById('canvas-animacao');
const animationContext = animationCanvas.getContext('2d');
const picture = new Image();
picture.src = 'assets/landscape.svg';

const size = 180;
const halfSize = size / 2;
const position = { x: 150, y: 150 };
const target = { x: 150, y: 150 };

function limitar(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo);
}

function atualizarAlvo(event) {
  const area = animationCanvas.getBoundingClientRect();
  const escalaX = animationCanvas.width / area.width;
  const escalaY = animationCanvas.height / area.height;
  target.x = limitar((event.clientX - area.left) * escalaX, halfSize, animationCanvas.width - halfSize);
  target.y = limitar((event.clientY - area.top) * escalaY, halfSize, animationCanvas.height - halfSize);
}

function desenharQuadro() {
  animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
  position.x += (target.x - position.x) * 0.18;
  position.y += (target.y - position.y) * 0.18;

  if (picture.complete && picture.naturalWidth > 0) {
    animationContext.drawImage(picture, position.x - halfSize, position.y - halfSize, size, size);
  }
  requestAnimationFrame(desenharQuadro);
}

animationCanvas.addEventListener('pointermove', atualizarAlvo);
// Não zeramos o alvo no pointerleave: a ilustração fica dentro da tela e para na última posição válida.
picture.addEventListener('load', () => requestAnimationFrame(desenharQuadro), { once: true });
picture.addEventListener('error', () => {
  animationContext.fillStyle = '#252822';
  animationContext.fillText('Não foi possível carregar a paisagem.', 10, 20);
}, { once: true });
