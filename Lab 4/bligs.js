const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const feedback = document.getElementById('guess-feedback');
const panel = document.getElementById('guess-panel');
const submitButton = guessForm.querySelector('button');
let secretNumber = Math.floor(Math.random() * 100);
let gameFinished = false;

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const guess = Number(guessInput.value);
  if (!Number.isInteger(guess) || guess < 0 || guess > 99) {
    feedback.textContent = 'Digite um número inteiro entre 0 e 99.';
    feedback.className = 'guess-feedback error';
    return;
  }
  if (gameFinished) return;

  panel.classList.remove('is-wrong');
  if (guess === secretNumber) {
    feedback.textContent = `Acertou! O número era ${secretNumber}.`;
    feedback.className = 'guess-feedback success';
    guessInput.disabled = true;
    submitButton.disabled = true;
    gameFinished = true;
  } else {
    panel.classList.add('is-wrong');
    feedback.textContent = guess < secretNumber ? 'O número secreto é maior.' : 'O número secreto é menor.';
    feedback.className = 'guess-feedback error';
    guessInput.select();
  }
});

document.getElementById('new-game').addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * 100);
  gameFinished = false;
  guessInput.value = '';
  guessInput.disabled = false;
  submitButton.disabled = false;
  panel.classList.remove('is-wrong');
  feedback.textContent = 'Novo número escolhido. Boa sorte!';
  feedback.className = 'guess-feedback';
  guessInput.focus();
});










