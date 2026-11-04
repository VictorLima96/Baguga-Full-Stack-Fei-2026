const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const guessFeedback = document.getElementById('guess-feedback');
const guessPanel = document.getElementById('guess-panel');
const newGameButton = document.getElementById('new-game');

let numeroSecreto = gerarNumeroSecreto();
let jogoEncerrado = false;

function gerarNumeroSecreto() {
  return Math.floor(Math.random() * 100);
}

function mostrarMensagem(texto, tipo = '') {
  guessFeedback.textContent = texto;
  guessFeedback.className = `guess-feedback ${tipo}`.trim();
}

function iniciarNovoJogo() {
  numeroSecreto = gerarNumeroSecreto();
  jogoEncerrado = false;
  guessInput.disabled = false;
  guessForm.querySelector('button').disabled = false;
  guessPanel.classList.remove('is-wrong');
  guessInput.value = '';
  mostrarMensagem('Novo número escolhido. Boa sorte!');
  guessInput.focus();
}

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (jogoEncerrado) return;

  const palpite = Number(guessInput.value);
  if (!Number.isInteger(palpite) || palpite < 0 || palpite > 99) {
    mostrarMensagem('Digite um número inteiro entre 0 e 99.', 'error');
    guessInput.focus();
    return;
  }

  guessPanel.classList.remove('is-wrong');
  if (palpite === numeroSecreto) {
    mostrarMensagem(`Acertou! O número era ${numeroSecreto}.`, 'success');
    jogoEncerrado = true;
    guessInput.disabled = true;
    guessForm.querySelector('button').disabled = true;
  } else {
    guessPanel.classList.add('is-wrong');
    mostrarMensagem(palpite < numeroSecreto ? 'O número secreto é maior. Tente de novo!' : 'O número secreto é menor. Tente de novo!', 'error');
    guessInput.select();
  }
});

newGameButton.addEventListener('click', iniciarNovoJogo);
