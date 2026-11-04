const canvasDesenho = document.getElementById('canvas-desenho');
const contexto = canvasDesenho.getContext('2d');

function desenhar_quadrado(ctx, x, y, largura, altura, cor) {
  ctx.fillStyle = cor;
  ctx.fillRect(x, y, largura, altura);
}

function desenhar_linha(ctx, x1, y1, x2, y2, cor, espessura = 1) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = cor;
  ctx.lineWidth = espessura;
  ctx.stroke();
}

function desenhar_arco(ctx, x, y, raio, inicio, fim, cor, preencher = false, espessura = 1.4) {
  ctx.beginPath();
  ctx.arc(x, y, raio, inicio, fim);
  if (preencher) {
    ctx.fillStyle = cor;
    ctx.fill();
  } else {
    ctx.strokeStyle = cor;
    ctx.lineWidth = espessura;
    ctx.stroke();
  }
}

function escrever(ctx, texto, x, y, cor, fonte = '20px Arial') {
  ctx.fillStyle = cor;
  ctx.font = fonte;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(texto, x, y);
}

function desenharCena() {
  const verde = '#4caf50';
  contexto.clearRect(0, 0, canvasDesenho.width, canvasDesenho.height);
  contexto.fillStyle = '#ffffff';
  contexto.fillRect(0, 0, 300, 300);
  contexto.strokeStyle = '#222222';
  contexto.lineWidth = 1;
  contexto.strokeRect(.5, .5, 299, 299);

  desenhar_quadrado(contexto, 1, 1, 48, 47, '#1010f5');
  desenhar_quadrado(contexto, 251, 1, 48, 47, '#f00');
  escrever(contexto, 'Canvas', 150, 43, '#333333', '20px Arial');
  desenhar_linha(contexto, 48, 47, 150, 150, '#1515ff', 1.2);
  desenhar_linha(contexto, 252, 47, 150, 150, '#ff1616', 1.2);

  desenhar_arco(contexto, 150, 153, 75, Math.PI, Math.PI * 2, verde);
  desenhar_arco(contexto, 150, 153, 56, Math.PI, Math.PI * 2, verde);
  desenhar_linha(contexto, 1, 150, 299, 150, verde, 1.2);
  desenhar_quadrado(contexto, 1, 119, 29, 27, '#00e9e9');
  desenhar_quadrado(contexto, 1, 148, 29, 28, '#00e9e9');
  desenhar_quadrado(contexto, 271, 131, 28, 27, '#00e9e9');
  desenhar_quadrado(contexto, 271, 159, 28, 18, '#00e9e9');
  desenhar_quadrado(contexto, 109, 151, 38, 38, '#f00000');
  desenhar_arco(contexto, 150, 117, 15, 0, Math.PI * 2, '#08e7f2', true);
  desenhar_arco(contexto, 150, 117, 15, 0, Math.PI * 2, '#1616ff', false, 1.2);

  desenhar_arco(contexto, 70, 220, 14, 0, Math.PI * 2, '#f5ff00', true);
  desenhar_arco(contexto, 70, 220, 14, 0, Math.PI * 2, '#4caf50', false, 1.2);
  desenhar_arco(contexto, 230, 220, 14, 0, Math.PI * 2, '#f5ff00', true);
  desenhar_arco(contexto, 230, 220, 14, 0, Math.PI * 2, '#4caf50', false, 1.2);

  desenhar_arco(contexto, 150, 300, 75, Math.PI, Math.PI * 2, verde);
  desenhar_arco(contexto, 150, 300, 56, Math.PI, Math.PI * 2, verde);
  desenhar_arco(contexto, 150, 300, 37, Math.PI, Math.PI * 2, '#00e5dd', true);

  desenhar_quadrado(contexto, 1, 240, 28, 28, '#ffff00');
  desenhar_quadrado(contexto, 29, 268, 28, 28, '#ffff00');
  desenhar_quadrado(contexto, 1, 268, 28, 28, '#ffff00');
  desenhar_quadrado(contexto, 272, 268, 27, 28, '#050505');
  desenhar_quadrado(contexto, 244, 240, 28, 28, '#050505');
  desenhar_quadrado(contexto, 272, 240, 27, 28, '#050505');
}

desenharCena();
