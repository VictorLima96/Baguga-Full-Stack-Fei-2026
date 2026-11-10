const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function desenhar_quadrado(x, y, largura, altura, cor) {
  ctx.fillStyle = cor;
  ctx.fillRect(x, y, largura, altura);
}

function desenhar_linha(x1, y1, x2, y2, cor, espessura) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = cor;
  ctx.lineWidth = espessura;
  ctx.stroke();
}

function desenhar_arco(x, y, raio, inicio, fim, cor, preenchido) {
  ctx.beginPath();
  ctx.arc(x, y, raio, inicio, fim);

  if (preenchido) {
    ctx.fillStyle = cor;
    ctx.fill();
  } else {
    ctx.strokeStyle = cor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function escrever(texto, x, y, cor, fonte) {
  ctx.fillStyle = cor;
  ctx.font = fonte;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(texto, x, y);
}

function desenhar_figura() {
  const verde = "#4caf50";

  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 300, 300);
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, 299, 299);

  desenhar_quadrado(1, 1, 48, 47, "#1010f5");
  desenhar_quadrado(251, 1, 48, 47, "#ff0000");
  escrever("Canvas", 150, 43, "#333333", "20px Arial");

  desenhar_linha(48, 47, 150, 150, "#1515ff", 1.2);
  desenhar_linha(252, 47, 150, 150, "#ff1616", 1.2);

  desenhar_arco(150, 153, 75, Math.PI, Math.PI * 2, verde, false);
  desenhar_arco(150, 153, 56, Math.PI, Math.PI * 2, verde, false);
  desenhar_linha(1, 150, 299, 150, verde, 1.2);

  desenhar_quadrado(1, 119, 29, 27, "#00e9e9");
  desenhar_quadrado(1, 148, 29, 28, "#00e9e9");
  desenhar_quadrado(271, 131, 28, 27, "#00e9e9");
  desenhar_quadrado(271, 159, 28, 18, "#00e9e9");
  desenhar_quadrado(109, 151, 38, 38, "#f00000");

  desenhar_arco(150, 117, 15, 0, Math.PI * 2, "#08e7f2", true);
  desenhar_arco(150, 117, 15, 0, Math.PI * 2, "#1616ff", false);

  desenhar_arco(70, 220, 14, 0, Math.PI * 2, "#f5ff00", true);
  desenhar_arco(70, 220, 14, 0, Math.PI * 2, verde, false);
  desenhar_arco(230, 220, 14, 0, Math.PI * 2, "#f5ff00", true);
  desenhar_arco(230, 220, 14, 0, Math.PI * 2, verde, false);

  desenhar_arco(150, 300, 75, Math.PI, Math.PI * 2, verde, false);
  desenhar_arco(150, 300, 56, Math.PI, Math.PI * 2, verde, false);
  desenhar_arco(150, 300, 37, Math.PI, Math.PI * 2, "#00e5dd", true);

  desenhar_quadrado(1, 240, 28, 28, "#ffff00");
  desenhar_quadrado(29, 268, 28, 28, "#ffff00");
  desenhar_quadrado(1, 268, 28, 28, "#ffff00");
  desenhar_quadrado(272, 268, 27, 28, "#050505");
  desenhar_quadrado(244, 240, 28, 28, "#050505");
  desenhar_quadrado(272, 240, 27, 28, "#050505");
}

desenhar_figura();
