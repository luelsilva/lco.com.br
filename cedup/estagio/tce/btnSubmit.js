import { getCursoByID } from './util';

// Seleciona o formulário pelo ID
const form = document.getElementById('myForm');

// Adiciona um event listener para o evento de submissão do formulário
form.addEventListener('submit', function (event) {
  // Impede o envio do formulário
  event.preventDefault();

  // pega dados do form
  let formData = new FormData(event.target);

  let formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  const estagEnder = formObject["enderecoEstagiario"] || ""
  const estagNum = formObject["numEnderEstagiario"] || ""
  const estagBairro = formObject["bairroEstagiario"] || ""
  const estagCidade = formObject["cidadeEstagiario"] || ""
  const estagEstado = formObject["estadoEstagiario"] || ""
  const estagCep = formObject["cepEstagiario"] || ""

  const empresaEnder = formObject["enderecoEmpresa"] || ""
  const empresaNum = formObject["numEnderEmpresa"] || ""
  const empresaBairro = formObject["bairroEmpresa"] || ""
  const empresaCidade = formObject["cidadeEmpresa"] || ""
  const empresaEstado = formObject["estadoEmpresa"] || ""
  const empresaCep = formObject["cepEmpresa"] || ""

  formObject["enderecoCompletoEstagiario"] =
    estagEnder + ", " +
    estagNum + " - " +
    estagBairro + " - " +
    estagCidade + "/" +
    estagEstado + " CEP: " +
    estagCep

  formObject["enderecoCompletoEmpresa"] =
    empresaEnder + ", " +
    empresaNum + " - " +
    empresaBairro + " - " +
    empresaCidade + "/" +
    empresaEstado + " CEP: " +
    empresaCep

  formObject["dataAtual"] = dataAtual();

  const siglaCurso = formObject["siglaCurso"];

  var result = getCursoByID(siglaCurso);

  if (result) {

    formObject["nomeCurso"] = result[1];
    formObject["matriculaProfessor"] = result[2];
    formObject["nomeProfessor"] = result[3];
    formObject["emailProfessor"] = result[4];

    // let valores = JSON.stringify(formObject);
    //console.log(valores);

    imprimir(formObject);
  }
});


