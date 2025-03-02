const CURSOS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vShZorYX2beBEdGmUYadD9rofdIPRH7GMZ2R8FjmAa0zWz1Mzs3q9Wmd_2iCM2UmUYjWd8wgSG7k5E8/pub?output=csv";

const API_URL = "https://colupe.com/";

const TCE_URL = "https://www.lco.com.br/cedup/estagio/tce/old/";

const FAVICON_URL =
  "https://www.lco.com.br/cedup/estagio/assets/img/favicon.png";

document.addEventListener("DOMContentLoaded", async () => {
  await carregaCursos();
  verificaParametrosUrl();
});

async function carregaCursos() {
  fetch(CURSOS_URL)
    .then((response) => response.text())
    .then((data) => {
      const linhas = data.split("\n");
      console.log("passo 1");

      // Ignora a primeira linha
      const linhasSemPrimeira = linhas.slice(1);
      const cursoSelect = document.getElementById("siglaCurso");
      cursoSelect.innerHTML = ""; // Limpa opções antigas

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
}

// Verifica se há parâmetros na URL para carregar a página
function verificaParametrosUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  console.log("passo 2");

  if (id) {
    fetch(`${API_URL}tce/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        return response.json();
      })
      .then((data) => {
        // Preenche os campos do formulário com os dados retornados
        Object.keys(data).forEach((key) => {
          const input = document.querySelector(`[name="${key}"]`);
          console.log(`[name="${key}"]`);

          if (input) {
            input.value = data[key];
          }
        });
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
}

// funções de busca cep
function meu_callback_estagiario(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById("enderecoEstagiario").value = conteudo.logradouro;
    document.getElementById("numEnderEstagiario").value = "";
    document.getElementById("bairroEstagiario").value = conteudo.bairro;
    document.getElementById("cidadeEstagiario").value = conteudo.localidade;
    document.getElementById("estadoEstagiario").value = conteudo.uf;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep(1);
    alert("CEP não encontrado.");
  }
}
// funções de busca cep
function meu_callback_empresa(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById("enderecoEmpresa").value = conteudo.logradouro;
    document.getElementById("numEnderEmpresa").value = "";
    document.getElementById("bairroEmpresa").value = conteudo.bairro;
    document.getElementById("cidadeEmpresa").value = conteudo.localidade;
    document.getElementById("estadoEmpresa").value = conteudo.uf;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep(2);
    alert("CEP não encontrado.");
  }
}
// funções de busca cep
function limpa_formulário_cep(quem) {
  if (quem === 1) {
    //Limpa valores do formulário de cep.
    document.getElementById("enderecoEstagiario").value = "";
    document.getElementById("numEnderEstagiario").value = "";
    document.getElementById("bairroEstagiario").value = "";
    document.getElementById("cidadeEstagiario").value = "";
    document.getElementById("estadoEstagiario").value = "";
  } else {
    //Limpa valores do formulário de cep.
    document.getElementById("enderecoEmpresa").value = "";
    document.getElementById("numEnderEmpresa").value = "";
    document.getElementById("bairroEmpresa").value = "";
    document.getElementById("cidadeEmpresa").value = "";
    document.getElementById("estadoEmpresa").value = "";
  }
}
// funções de busca cep
function pesquisaCep(valor, quem) {
  // 1 para estagiario 2 para empresa

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, "");

  //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      if (quem === 1) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById("enderecoEstagiario").value = "...";
        document.getElementById("numEnderEstagiario").value = "...";
        document.getElementById("bairroEstagiario").value = "...";
        document.getElementById("cidadeEstagiario").value = "...";
        document.getElementById("estadoEstagiario").value = "...";
      } else {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById("enderecoEmpresa").value = "...";
        document.getElementById("numEnderEmpresa").value = "...";
        document.getElementById("bairroEmpresa").value = "...";
        document.getElementById("cidadeEmpresa").value = "...";
        document.getElementById("estadoEmpresa").value = "...";
      }

      //Cria um elemento javascript.
      var script = document.createElement("script");

      //Sincroniza com o callback.
      if (quem === 1) {
        script.src =
          "https://viacep.com.br/ws/" +
          cep +
          "/json/?callback=meu_callback_estagiario";
      } else {
        script.src =
          "https://viacep.com.br/ws/" +
          cep +
          "/json/?callback=meu_callback_empresa";
      }

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep(quem);
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep(quem);
  }
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

// Entrada: "2024-07-10";
// Saída: 10/07/2024
function formataData(data) {
  // Dividindo a data original em componentes
  let partes = data.split("-");
  let ano = partes[0];
  let mes = partes[1];
  let dia = partes[2];

  // Reformatando para o novo formato
  let dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}

// busca um curso pelo id do curso
// retorna um array [cursoID, cursoNome, profMatricula, profNome, profEmail]
async function getCursoByID(siglaCurso) {
  try {
    const resposta = await fetch(CURSOS_URL);
    const texto = await resposta.text();

    const linhas = texto.split("\n");
    // Ignora a primeira linha
    const linhasSemPrimeira = linhas.slice(1);

    let resultado = null;

    for (const linha of linhas) {
      const colunas = linha.split(",");

      if (colunas[0] === siglaCurso) {
        resultado = colunas;
        break;
      }
    }

    if (resultado) {
      // Aqui você pode fazer o que quiser com o resultado, como armazená-lo em uma matriz ou exibi-lo na página
      return resultado;
    } else {
      console.log("Chave não encontrada.");
      alert("Curso não encontrado");
    }
  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
    alert("Erro ao buscar dados do curso");
  }
}

// primeiro coloca os valores de formObject[<variavel>] em divPrint.innerHTML(${<variavel>})
async function imprimir(formObject) {
  const siglaCurso = formObject["siglaCurso"];

  var result = await getCursoByID(siglaCurso);

  if (result) {
    formObject["nomeCurso"] = result[1];
    formObject["matriculaProfessor"] = result[2];
    formObject["nomeProfessor"] = result[3];
    formObject["emailProfessor"] = result[4];

    // Seleciona a div print
    const divPrint = document.getElementById("print");
    const originalContent = divPrint.innerHTML;

    // não substitui duas vezes, porque a palavra chava já foi substituída
    // em que carregar o texto novamente
    // Substitui os placeholders com os valores do objeto JSON

    divPrint.innerHTML = divPrint.innerHTML
      .replace("${nomeEstagiario}", formObject["nomeEstagiario"])
      .replace("${nomeCurso}", formObject["nomeCurso"])
      .replace("${matriculaEstagiario}", formObject["matriculaEstagiario"])
      .replace("${cpfEstagiario}", formObject["cpfEstagiario"])
      .replace("${telefoneEstagiario}", formObject["telefoneEstagiario"])
      .replace("${emailEstagiario}", formObject["emailEstagiario"])
      .replace(
        "${dataNascimento}",
        await formataData(formObject["dataNascimento"])
      )
      .replace(
        "${enderecoCompletoEstagiario}",
        formObject["enderecoCompletoEstagiario"]
      )
      .replace("${deficiencia}", formObject["deficiencia"])
      .replace("${nomeProfessor}", formObject["nomeProfessor"])
      .replace("${matriculaProfessor}", formObject["matriculaProfessor"])
      .replace("${emailProfessor}", formObject["emailProfessor"])
      .replace("${nomeEmpresa}", formObject["nomeEmpresa"])
      .replace("${cnpj}", formObject["cnpj"])
      .replace(
        "${enderecoCompletoEmpresa}",
        formObject["enderecoCompletoEmpresa"]
      )
      .replace("${telefoneEmpresa}", formObject["telefoneEmpresa"])
      .replace("${emailEmpresa}", formObject["emailEmpresa"])
      .replace("${ramoAtividade}", formObject["ramoAtividade"])
      .replace("${representante}", formObject["representante"])
      .replace("${supervidor}", formObject["supervidor"])
      .replace("${cargo}", formObject["cargo"])
      .replace("${apolice}", formObject["apolice"])
      .replace("${seguradora}", formObject["seguradora"])
      .replace("${cnpjSeguradora}", formObject["cnpjSeguradora"])
      .replace("${dataInicio}", await formataData(formObject["dataInicio"]))
      .replace("${dataFim}", await formataData(formObject["dataFim"]))
      .replace("${dataImpressao}", formObject["dataImpressao"])
      .replace("${nomeEstagiario2}", formObject["nomeEstagiario"])
      .replace("${cpfEstagiario2}", formObject["cpfEstagiario"])
      .replace("${tipoEstagio}", formObject["tipoEstagio"])
      .replace("${dataInicio2}", await formataData(formObject["dataInicio"]))
      .replace("${dataFim2}", await formataData(formObject["dataFim"]))
      .replace(
        "${horarioEstagio}",
        formObject["horarioEstagio"].replace(/\n/g, "<br>")
      )
      .replace("${cargaHorariaSemanal}", formObject["cargaHorariaSemanal"])
      .replace("${cargaHorariaTotal}", formObject["cargaHorariaTotal"])
      .replace("${apolice2}", formObject["apolice"])
      .replace(
        "${bolsaAuxilio}",
        formObject["bolsaAuxilio"].replace(/\n/g, "<br>")
      )
      .replace(
        "${atividades}",
        formObject["atividades"].replace(/\n/g, "<br>")
      );

    window.print();

    divPrint.innerHTML = originalContent;
  }
}

// Adiciona um event listener para o evento de submissão do formulário
document.getElementById("myForm").addEventListener("submit", function (event) {
  // Impede o envio do formulário
  event.preventDefault();

  preencherComUUIDSeVazio();
  preencherDataHoraImpressao();

  // pega dados do form
  let formData = new FormData(event.target);

  let formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  sendDataToAPI(formObject);

  const estagEnder = formObject["enderecoEstagiario"] || "";
  const estagNum = formObject["numEnderEstagiario"] || "";
  const estagBairro = formObject["bairroEstagiario"] || "";
  const estagCidade = formObject["cidadeEstagiario"] || "";
  const estagEstado = formObject["estadoEstagiario"] || "";
  const estagCep = formObject["cepEstagiario"] || "";

  const empresaEnder = formObject["enderecoEmpresa"] || "";
  const empresaNum = formObject["numEnderEmpresa"] || "";
  const empresaBairro = formObject["bairroEmpresa"] || "";
  const empresaCidade = formObject["cidadeEmpresa"] || "";
  const empresaEstado = formObject["estadoEmpresa"] || "";
  const empresaCep = formObject["cepEmpresa"] || "";

  formObject["enderecoCompletoEstagiario"] =
    estagEnder +
    ", " +
    estagNum +
    " - " +
    estagBairro +
    " - " +
    estagCidade +
    "/" +
    estagEstado +
    " CEP: " +
    estagCep;

  formObject["enderecoCompletoEmpresa"] =
    empresaEnder +
    ", " +
    empresaNum +
    " - " +
    empresaBairro +
    " - " +
    empresaCidade +
    "/" +
    empresaEstado +
    " CEP: " +
    empresaCep;

  imprimir(formObject);
});

// preenche o campo com UUID se estiver vazio
function preencherComUUIDSeVazio() {
  const idUnico = document.getElementById("idUnico");
  const createAt = document.getElementById("createAt");
  const timeUnix = document.getElementById("timeUnix");

  // Verifica se o campo está vazio
  if (idUnico.value.trim() === "") {
    idUnico.value = crypto.randomUUID(); // Gera e preenche com um UUID
    createAt.value = Date();
    timeUnix.value = Date.now();
  }
}

// preenche a data e hora de impressao
function preencherDataHoraImpressao() {
  const dataImpressao = document.getElementById("dataImpressao");
  const horaImpressao = document.getElementById("horaImpressao");

  dataImpressao.value = getDataAtual();

  const agora = new Date();
  const horaMinuto = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  horaImpressao.value = horaMinuto;
}

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
}

// enviar o JSON para a API
async function sendDataToAPI(jsonObject) {
  document.getElementById("responseMessage").innerText = "";
  try {
    // Fazendo a requisição usando fetch
    const response = await fetch(API_URL + "tce", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById("responseMessage").innerText = "";
    console.log(data.message);
  } catch (error) {
    document.getElementById(
      "responseMessage"
    ).innerText = `Erro ao chamar API: ${error.message}`;
  }
}

// faz download de um atalho
function criarAtalho() {
  preencherComUUIDSeVazio();

  const formDataJson = getFormDataAsJson("myForm");

  sendDataToAPI(formDataJson);

  const idUnico = document.getElementById("idUnico");
  const matrEstag = document.getElementById("matriculaEstagiario");
  const nomeEstag = document.getElementById("nomeEstagiario");

  const tceUrl = TCE_URL; // URL do site desejado
  const faviconUrl = FAVICON_URL;
  const nomeArquivo =
    "Cedup " + matrEstag.value + " " + nomeEstag.value + ".url";
  const atalhoUrl = tceUrl + "?id=" + idUnico.value;

  const conteudo = `[InternetShortcut]
URL=${atalhoUrl}
IconIndex=0
IconFile=${faviconUrl}
`;

  const blob = new Blob([conteudo], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nomeArquivo;
  a.click();
  URL.revokeObjectURL(a.href);
}

// faz download dos dados em um arquivo json
// não estou usando emm produção, somente para testes
function saveDados() {
  preencherComUUIDSeVazio();

  const formDataJson = getFormDataAsJson("myForm");

  sendDataToAPI(formDataJson);

  let fileName =
    "Cedup " +
    formDataJson["matriculaEstagiario"] +
    " " +
    formDataJson["nomeEstagiario"];

  const jsonString = JSON.stringify(formDataJson, null, 2); // Converter objeto JSON para string
  const blob = new Blob([jsonString], { type: "application/json" }); // Criar um Blob com o conteúdo JSON
  const url = URL.createObjectURL(blob); // Criar uma URL para o Blob

  // coloque isso se precisar abrir um dialogo para alterar o nome do arquivo
  // fileName = prompt('Entre o nome do arquivo para salvar:', fileName);

  if (fileName) {
    fileName = fileName + ".json";
    const a = document.createElement("a"); // Criar um elemento de link
    a.href = url;
    a.download = fileName; // Nome sugerido para o arquivo
    document.body.appendChild(a); // Adicionar o link ao DOM
    a.click(); // clicar nele para abrir a janela de diálogo "Salvar Como"
    document.body.removeChild(a); // Remover o link do DOM
    URL.revokeObjectURL(url); // Liberar a URL
  }
}

function copiarLink() {
  preencherComUUIDSeVazio();

  const formDataJson = getFormDataAsJson("myForm");

  sendDataToAPI(formDataJson);

  const id = formDataJson["idUnico"];

  const link = `https://lco.com.br/cedup/estagio/tce/?id=${id}`;
  navigator.clipboard.writeText(link).then(() => alert("Link copiado!"));
}
