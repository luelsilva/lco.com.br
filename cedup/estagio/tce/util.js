// recebe um ID do form e devolve um JSON
export function getFormDataAsJson(formId) {
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

// devolve a data atual formatada
// Saída: 10/07/2024
export function getDataAtual() {
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
export function formataData(data) {

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
export function saveJsonToFile(jsonObject, fileName) {

  const jsonString = JSON.stringify(jsonObject, null, 2); // Converter objeto JSON para string
  const blob = new Blob([jsonString], { type: "application/json" }); // Criar um Blob com o conteúdo JSON
  const url = URL.createObjectURL(blob);  // Criar uma URL para o Blob

  // isso aqui é porque o chrome não abre o diálogo
  fileName = prompt("Entre o nome do arquivo para salvar:", fileName);

  if (fileName) {
    fileName =+ 'json';
    const a = document.createElement("a");  // Criar um elemento de link
    a.href = url;
    a.download = fileName;                  // Nome sugerido para o arquivo
    document.body.appendChild(a);           // Adicionar o link ao DOM
    a.click();                              // clicar nele para abrir a janela de diálogo "Salvar Como"
    document.body.removeChild(a);           // Remover o link do DOM
    URL.revokeObjectURL(url);               // Liberar a URL
  }
}

// retorna um array [cursoID, cursoNome, profMatricula, profNome, profEmail]
export async function getCursos() {
  try {
    const resposta = await fetch(cursoURL);
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

// busca um curso pelo id do curso
// retorna um array [cursoID, cursoNome, profMatricula, profNome, profEmail]
export async function getCursoByID(cursoID) {

  try {
    const resposta = await fetch(cursoURL);
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
