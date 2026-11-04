const campoTexto = document.getElementById('text');
const saidaTexto = document.getElementById('spanito');
const saidaNascimento = document.getElementById('r1');
const saidaContagem = document.getElementById('r2');

function imprimir() {
    saidaTexto.textContent = campoTexto.value || 'Digite um texto primeiro.';
}

function ex1() {
    const nome = document.getElementById('ex1_nome').value.trim();
    const idade = Number(document.getElementById('ex1_idade').value);
    if (!nome || !Number.isInteger(idade) || idade < 0 || idade > 130) {
        saidaNascimento.textContent = 'Informe um nome e uma idade válida.';
        return;
    }
    const anoNascimento = new Date().getFullYear() - idade;
    saidaNascimento.textContent = `Olá, ${nome}! Seu ano aproximado de nascimento é ${anoNascimento}.`;
}

function ex2() {
    const limite = Number(document.getElementById('ex2_num').value);
    if (!Number.isInteger(limite) || limite < 0 || limite > 100) {
        saidaContagem.textContent = 'Digite um inteiro entre 0 e 100.';
        return;
    }
    const numeros = [];
    for (let numero = 0; numero <= limite; numero += 1) numeros.push(numero);
    saidaContagem.textContent = numeros.join(', ');
}

function soma(a, b) { return a + b; }
function mult(a, b) { return a * b; }

document.getElementById('print-text').addEventListener('click', imprimir);
document.getElementById('run-ex1').addEventListener('click', ex1);
document.getElementById('run-ex2').addEventListener('click', ex2);
console.log(`Exemplos de funções — soma: ${soma(6, 7)}, multiplicação: ${mult(6, 7)}`);



