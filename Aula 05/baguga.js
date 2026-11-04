const output = document.getElementById('output');
const valueInput = document.getElementById('value-input');

function executarExemplos() {
    const valor = Number(valueInput.value);
    if (valueInput.value.trim() === '' || !Number.isFinite(valor)) {
        output.textContent = 'Digite um número válido para ver os exemplos.';
        return;
    }

    const inteiro = parseInt(String(valor), 10);
    const decimal = parseFloat(String(valor));
    const linhasWhile = [];
    let contador = 0;
    while (contador < 5) {
        linhasWhile.push(contador);
        contador += 1;
    }

    const linhasFor = [];
    for (let indice = 0; indice < 5; indice += 1) {
        linhasFor.push(indice);
    }

    const comparacao = valor > 10
        ? 'O número é maior que 10.'
        : valor < 10
            ? 'O número é menor que 10.'
            : 'O número é igual a 10.';

    output.textContent = [
        `parseInt: ${inteiro}`,
        `parseFloat: ${decimal}`,
        `String: ${String(valor)}`,
        comparacao,
        `while: ${linhasWhile.join(', ')}`,
        `for: ${linhasFor.join(', ')}`
    ].join('\n');
}

document.getElementById('run-examples').addEventListener('click', executarExemplos);

