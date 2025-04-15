//const cursoURL = 'https://www.lco.com.br/cedup/estagio/assets/cursos_tecnicos.csv';
const cursoURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vShZorYX2beBEdGmUYadD9rofdIPRH7GMZ2R8FjmAa0zWz1Mzs3q9Wmd_2iCM2UmUYjWd8wgSG7k5E8/pub?output=csv";

// carrega cursos no form select 'siglaCurso'
document.addEventListener("DOMContentLoaded", function () {
  fetch(cursoURL)
    .then((response) => response.text())
    .then((data) => {
      const linhas = data.split("\n");
      // Ignora a primeira linha
      const linhasSemPrimeira = linhas.slice(1);
      const cursoSelect = document.getElementById("curso");
      linhasSemPrimeira.forEach((linha) => {
        const colunas = linha.split(",");
        if (colunas.length >= 2) {
          const option = document.createElement("option");
          option.value = colunas[0].trim();
          option.textContent = colunas[1].trim();
          cursoSelect.appendChild(option);
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os cursos:", error);
      alert("Erro ao carregar os cursos");
    });
});
// Seleciona o formulário pelo ID
const form = document.getElementById("formCarta");

// Adiciona um event listener para o evento de submissão do formulário
form.addEventListener("submit", function (event) {
  // Impede o envio do formulário
  event.preventDefault();

  // Chama a função desejada
  imprimir();
});

async function imprimir() {
  document.getElementById("print_nomeAluno").innerHTML =
    document.getElementById("nomeAluno").value;
  document.getElementById("print_matriculaAluno").innerHTML =
    document.getElementById("matriculaAluno").value;
  document.getElementById("print_cpfAluno").innerHTML =
    document.getElementById("cpfAluno").value;
  document.getElementById("print_cargaHoraria").innerHTML =
    document.getElementById("cargaHoraria").value;
  document.getElementById("print_dataFim").innerHTML =
    document.getElementById("dataFim").value;
  document.getElementById("print_nomeEmpresa").innerHTML =
    document.getElementById("nomeEmpresa").value;

  var selectElement = document.getElementById("nomeCurso");
  var selectedIndex = selectElement.selectedIndex;
  var selectedText = selectElement.options[selectedIndex].text;

  document.getElementById("print_nome_curso").innerHTML = selectedText;

  document.getElementById("print_data_atual").innerHTML =
    "Joinville, " + getDataAtual();

  var result = await buscarDados();

  window.print();
}

// devolve a data atual formatada
// Saída: 10/07/2024
function getDataAtual() {
  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth() + 1; // Os meses em JavaScript são indexados a partir de zero, então adicionamos 1 para obter o mês correto
  let ano = data.getFullYear();

  // Adicionando zero à esquerda se o dia ou o mês forem menores que 10
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }

  return dia + "/" + mes + "/" + ano;
}
