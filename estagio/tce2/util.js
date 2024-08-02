// recebe um ID do form e devolve um JSON
function getFormDataAsJson(formId) {
  // Seleciona o formulário pelo ID
  const form = document.getElementById(formId);

  // Cria um objeto FormData a partir do formulário
  const formData = new FormData(form);

  // Inicializa um objeto vazio para armazenar os dados do formulário
  const formDataJson = {};

  // Itera sobre os pares chave/valor do FormData e adiciona ao objeto JSON
  formData.forEach((value, key) => {
    // Se a chave já existe, converte o valor em um array (para campos com o mesmo nome)
    if (formDataJson[key]) {
      if (Array.isArray(formDataJson[key])) {
        formDataJson[key].push(value);
      } else {
        formDataJson[key] = [formDataJson[key], value];
      }
    } else {
      formDataJson[key] = value;
    }
  });

  // Retorna o objeto JSON
  return formDataJson;
};

// preencher os inputs do form com um objeto json
function populateFormJS(dataJson, formID) {
  const form = document.getElementById(formID);
  for (const key in dataJson) {
    if (dataJson.hasOwnProperty(key)) {
      const input = form.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = dataJson[key];
      }
    }
  }
};

// devolve a data atual formatada
// Saída: 10/07/2024
function getDataAtual() {
  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth() + 1; // Os meses em JavaScript são indexados a partir de zero, então adicionamos 1 para obter o mês correto
  let ano = data.getFullYear();

  // Adicionando zero à esquerda se o dia ou o mês forem menores que 10
  if (dia < 10) {
    dia = '0' + dia;
  }
  if (mes < 10) {
    mes = '0' + mes;
  }

  return dia + '/' + mes + '/' + ano;
};

// Entrada: "2024-07-10";
// Saída: 10/07/2024
function formataData(data) {

  // Dividindo a data original em componentes
  let partes = data.split('-');
  let ano = partes[0];
  let mes = partes[1];
  let dia = partes[2];

  // Reformatando para o novo formato
  let dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
};

// salva em arquivo um objeto json
function saveJsonToFile(jsonObject, fileName) {


  // Converter objeto JSON para string
  const jsonString = JSON.stringify(jsonObject, null, 2);

  // Criar um Blob com o conteúdo JSON
  const blob = new Blob([jsonString], { type: "application/json" });

  // Criar uma URL para o Blob
  const url = URL.createObjectURL(blob);

  // Criar um elemento de link
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Nome sugerido para o arquivo

  // Adicionar o link ao DOM e clicar nele para abrir a janela de diálogo "Salvar Como"
  document.body.appendChild(a);
  a.click();

  // Remover o link do DOM
  document.body.removeChild(a);

  // Liberar a URL
  URL.revokeObjectURL(url);
};

// busca um curso pelo id do curso
// retrona um array [cursoID, cursoNome, profMatricula, profNome, profEmail]
async function getCursoByID(cursoID) {

  try {
    const resposta = await fetch('https://www.lco.com.br/estagio/assets/cursos_tecnicos.csv');
    const texto = await resposta.text();

    const linhas = texto.split('\n');
    // Ignora a primeira linha
    const linhasSemPrimeira = linhas.slice(1);

    let resultado = null;

    for (const linha of linhas) {
      const colunas = linha.split(',');

      if (colunas[0] === siglaCurso) {
        resultado = colunas;
        break;
      }
    }

    if (resultado) {
      // Aqui você pode fazer o que quiser com o resultado, como armazená-lo em uma matriz ou exibi-lo na página
      return resultado;

    } else {
      console.log('Chave não encontrada.');
      alert("Curso não encontrado");
    }
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
    alert("Erro ao buscar dados do curso");
  }
};

// retorna um array [cursoID, cursoNome, profMatricula, profNome, profEmail]
async function getCursos() {

  try {
    const resposta = await fetch('https://www.lco.com.br/estagio/assets/cursos_tecnicos.csv');

    const texto = await resposta.text();

    const linhas = texto.split('\n');

    if (linhas) {
      return linhas;

    } else {
      alert("Curso não encontrado");
    }
  } catch (erro) {
    alert("Erro ao buscar dados do curso");
  }
};