const paletas = [
      { forma: 'blue', linha: 'red', arco: 'lightblue', contorno: 'brown' },
      { forma: 'green', linha: 'lime', arco: 'lightblue', contorno: 'blue' },
      { forma: 'green', linha: 'lime', arco: 'lightblue', contorno: 'blue' }
];

function desenharExemplo(canvas, cores) {
      const contexto = canvas.getContext('2d');
      contexto.clearRect(0, 0, canvas.width, canvas.height);

      contexto.beginPath();
      contexto.moveTo(200, 150);
      contexto.lineTo(60, 10);
      contexto.lineTo(60, 250);
      contexto.lineTo(200, 250);
      contexto.closePath();
      contexto.fillStyle = cores.forma;
      contexto.strokeStyle = cores.linha;
      contexto.lineWidth = 2;
      contexto.fill();
      contexto.stroke();

      contexto.fillStyle = 'grey';
      contexto.strokeStyle = 'white';
      contexto.fillRect(10, 10, 50, 50);
      contexto.strokeRect(10, 10, 50, 50);

      contexto.beginPath();
      contexto.arc(200, 200, 50, 1.5 * Math.PI, 2.5 * Math.PI);
      contexto.fillStyle = cores.arco;
      contexto.strokeStyle = cores.contorno;
      contexto.fill();
      contexto.stroke();

      contexto.font = '44px Arial';
      contexto.textAlign = 'center';
      contexto.fillStyle = 'pink';
      contexto.strokeStyle = 'purple';
      contexto.fillText('Boglis', 200, 350);
      contexto.strokeText('Boglis', 200, 350);
}

document.querySelectorAll('canvas').forEach((canvas, indice) => {
      desenharExemplo(canvas, paletas[indice] || paletas[0]);
});