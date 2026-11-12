document.addEventListener('DOMContentLoaded', function() {
      let canvas = document.getElementById('canvas');
     
      let ctx = canvas.getContext('2d');
         
              // test line
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'blue';
              ctx.strokeStyle = 'red';
              ctx.moveTo(200,150);
              ctx.lineTo(60,10);
              ctx.lineTo(60,250);
              ctx.lineTo(200,250);
              ctx.lineTo(200,150);
              ctx.fill();
              ctx.stroke();
              ctx.closePath();
          
              // retângulos
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'grey';
              ctx.strokeStyle = 'white';
              ctx.fillRect(10,10,50,50);
              ctx.strokeRect(10,10,50,50);
              ctx.closePath();
          
              // arcos
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'lightblue';
              ctx.strokeStyle = 'brown';
              ctx.arc(200,200,50,1.5*Math.PI,2.5*Math.PI);
              ctx.fill();
              ctx.stroke();
              ctx.closePath();
          
              // texto
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'pink';
              ctx.strokeStyle = 'purple';
              ctx.font = "90px Arial"
              ctx.textAlign = "center";
              ctx.fillText("Boglis",200,350);
              ctx.strokeText("Boglis",200,350)
              ctx.closePath();
});

document.addEventListener('DOMContentLoaded', function() {
      let canvas2 = document.getElementById('canvas2');
     
      let ctx = canvas2.getContext('2d');
         
              // test line
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'green';
              ctx.strokeStyle = 'lime';
              ctx.moveTo(200,150);
              ctx.lineTo(60,10);
              ctx.lineTo(60,250);
              ctx.lineTo(200,250);
              ctx.lineTo(200,150);
              ctx.fill();
              ctx.stroke();
              ctx.closePath();
          
              // retângulos
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'grey';
              ctx.strokeStyle = 'white';
              ctx.fillRect(10,10,50,50);
              ctx.strokeRect(10,10,50,50);
              ctx.closePath();
          
              // arcos
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'lightblue';
              ctx.strokeStyle = 'blue';
              ctx.arc(200,200,50,1.5*Math.PI,2.5*Math.PI);
              ctx.fill();
              ctx.stroke();
              ctx.closePath();
          
              // texto
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'pink';
              ctx.strokeStyle = 'purple';
              ctx.font = "90px Arial"
              ctx.textAlign = "center";
              ctx.fillText("Boglis",200,350);
              ctx.strokeText("Boglis",200,350)
              ctx.closePath();
});

document.addEventListener('DOMContentLoaded', function() {
      let canvas3 = document.getElementById('canvas3');
     
      let ctx = canvas3.getContext('2d');
         
              // test line
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'green';
              ctx.strokeStyle = 'lime';
              ctx.moveTo(200,150);
              ctx.lineTo(60,10);
              ctx.lineTo(60,250);
              ctx.lineTo(200,250);
              ctx.lineTo(200,150);
              ctx.fill();
              ctx.stroke();
              ctx.closePath();
          
              // retângulos
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'grey';
              ctx.strokeStyle = 'white';
              ctx.fillRect(10,10,50,50);
              ctx.strokeRect(10,10,50,50);
              ctx.closePath();
          
              // arcos
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'lightblue';
              ctx.strokeStyle = 'blue';
              ctx.arc(200,200,50,1.5*Math.PI,2.5*Math.PI);
              ctx.fill();
              ctx.stroke();
              ctx.closePath();
          
              // texto
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.fillStyle = 'pink';
              ctx.strokeStyle = 'purple';
              ctx.font = "90px Arial"
              ctx.textAlign = "center";
              ctx.fillText("Boglis",200,350);
              ctx.strokeText("Boglis",200,350)
              ctx.closePath();
});