console.log(document.getElementById("nome").innerHTML);

document.getElementById("nome").innerHTML="Kniggles";

function imprimir() {

let x = document.getElementById("text").value;

console.log(x);

document.getElementById("spanito").innerHTML = x;

}

function ex1() {

let nome = document.getElementById("ex1_nome").value;

let idade = document.getElementById("ex1_idade").value;

let ano_atual = 2026;

let ano_nasc = ano_atual - idade;

let resposta = "Olá " + nome + ", seu ano de nascimento é " + ano_nasc + "!";

document.getElementById("r1").innerHTML = resposta;

}

function soma(a, b) {

    return a + b;

}

function mult(a, b) {

    return a * b;

}

console.log(soma(6, 7));

console.log(mult(6, 7));

function ex2(a, b) {

    let x = document.getElementById("ex2_num").value;

    let resposta = "";

    for (let i = 0; i <= x; i++)

        resposta += i + " "; 

}

document.getElementById("r2").innerHTML = resposta;



