const sorteio = Math.random();
const numero_secreto = Math.floor(sorteio * 100);

let tentativas = 0;
let acertou = false;

function chutar() {
  if (acertou) {
    return;
  }

  const campo = document.getElementById("palpite");
  const valor = parseInt(campo.value);
  const mensagem = document.getElementById("mensagem");

  if (campo.value === "" || isNaN(valor) || valor < 0 || valor > 99) {
    mensagem.innerHTML = "Digite um número inteiro de 0 a 99.";
    return;
  }

  tentativas = tentativas + 1;
  document.getElementById("tentativas").innerHTML = tentativas;

  if (valor === numero_secreto) {
    mensagem.innerHTML = "Acertou! O número era " + numero_secreto + ".";
    document.getElementById("painel").style.setProperty("background-color", "green");
    acertou = true;
    campo.disabled = true;
  } else if (valor < numero_secreto) {
    mensagem.innerHTML = "O número secreto é maior. Tente de novo!";
    document.getElementById("painel").style.setProperty("background-color", "red");
  } else {
    mensagem.innerHTML = "O número secreto é menor. Tente de novo!";
    document.getElementById("painel").style.setProperty("background-color", "red");
  }

  campo.value = "";
  campo.focus();
}

document.getElementById("botao-chutar").addEventListener("click", chutar);
document.getElementById("botao-novo").addEventListener("click", function () {
  location.reload();
});
