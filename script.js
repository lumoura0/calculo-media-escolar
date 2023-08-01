const form = document.getElementById("form-atividade");
const imgAprovado = '<img src="./img/aprovado.png"/>';
const imgReprovado = '<img src="./img/reprovado.png"/>';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima: "));

let linhas = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha() {
  const inputNome = document.getElementById("nome-atividade");
  const inputNota = document.getElementById("nota-atividade");

  if (atividades.includes(inputNome.value)) {
    alert(`A atividade: ${inputNome.value} já foi inserida!`);
  } else {
    atividades.push(inputNome.value);
    notas.push(parseFloat(inputNota.value));

    let linha = "<tr>";
    linha += `<td>${inputNome.value}</td>`;
    linha += `<td>${inputNota.value}</td>`;
    linha += `<td>${
      inputNota.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`;
    linha += `</tr>`;

    linhas += linha;

    inputNome.value = "";
    inputNota.value = "";
  }
}

function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal();
  document.getElementById("media-final-valor").innerHTML =
    mediaFinal.toFixed(1);
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

  console.log(mediaFinal);
}

function calculaMediaFinal() {
  let somaDasNotas = 0;
  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }

  return somaDasNotas / notas.length;
}