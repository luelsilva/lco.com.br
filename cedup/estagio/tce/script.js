const CURSOS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vShZorYX2beBEdGmUYadD9rofdIPRH7GMZ2R8FjmAa0zWz1Mzs3q9Wmd_2iCM2UmUYjWd8wgSG7k5E8/pub?output=csv";

const DANTAS_API = "https://dantas-api.vercel.app/cedup/estagio";

const TCE_URL = "https://www.lco.com.br/cedup/estagio/estagiarios/tce";

const FAVICON_URL =
  "https://www.lco.com.br/cedup/estagio/assets/img/favicon.png";

let mmSiglaCurso = ""; // essa variável precisa ser definida antes, pode ser de algum lugar do seu sistema

document.addEventListener("DOMContentLoaded", async () => {
  mmSiglaCurso = "";
  await carregaCursos();
  verificaParametrosUrl();
});

async function carregaCursos() {
  try {
    const response = await fetch(CURSOS_URL);
    const data = await response.text();

    const linhas = data.split("\n");

    const linhasSemPrimeira = linhas.slice(1);
    const cursoSelect = document.getElementById("siglaCurso");
    cursoSelect.innerHTML = ""; // Limpa opções antigas

    // Adiciona a opção padrão antes de popular o select
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Selecione um curso";
    cursoSelect.appendChild(defaultOption);

    // Adiciona as opções dos cursos
    linhasSemPrimeira.forEach((linha) => {
      const colunas = linha.split(",");
      if (colunas.length >= 2) {
        const option = document.createElement("option");
        option.value = colunas[0].trim();
        option.textContent = colunas[1].trim();
        cursoSelect.appendChild(option);
      }
    });

    // Após popular o select, verifica e seleciona mmSiglaCurso, se existir
    if (mmSiglaCurso) {
      const optionToSelect = cursoSelect.querySelector(
        `option[value="${mmSiglaCurso}"]`
      );
      if (optionToSelect) {
        cursoSelect.value = mmSiglaCurso;
      } else {
        console.warn(
          `Valor ${mmSiglaCurso} não encontrado no select siglaCurso`
        );
      }
    }
  } catch (error) {
    console.error("Erro ao carregar os cursos:", error);
    alert("Erro ao carregar os cursos");
  }
}

// Verifica se há parâmetros na URL para carregar a página
function verificaParametrosUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    fetch(`${DANTAS_API}/estagiarios/${id}`)
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

          if (input) {
            input.value = data[key];
            if (key === "siglaCurso") {
              mmSiglaCurso = data[key];
              console.log(mmSiglaCurso);
            }
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

    // não substitui duas vezes, porque a palavra chave já foi substituída
    // tem que carregar o texto novamente
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
    const response = await fetch(DANTAS_API + "/estagiarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || `Erro: ${response.status}`);
    }

    document.getElementById("responseMessage").innerText = "Sucesso!";
    console.log(responseData.message);

    return responseData; // Retorna os dados de sucesso
  } catch (error) {
    document.getElementById(
      "responseMessage"
    ).innerText = `Erro: ${error.message}`;
    console.error("Erro na API:", error.message);

    throw error; // Propaga o erro para quem chamou a função
  }
}

// faz download de um atalho
async function criarAtalho() {
  try {
    const formDataJson = getFormDataAsJson("myForm");

    await sendDataToAPI(formDataJson);

    const matrEstag = document.getElementById("matriculaEstagiario");
    const nomeEstag = document.getElementById("nomeEstagiario");

    const faviconUrl = FAVICON_URL;
    const nomeArquivo = `Cedup ${matrEstag.value} ${nomeEstag.value}.url`;
    const atalhoUrl = TCE_URL + "/?id=" + matrEstag.value;

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
  } catch (error) {
    console.log("Erro na requisição. Interrompendo execução...");
    return; // Evita que o código seguinte seja executado
  }
  console.log("Esta linha só será executada se não houver erro!");
}

async function copiarLink() {
  try {
    const formDataJson = getFormDataAsJson("myForm");

    await sendDataToAPI(formDataJson);

    const id = formDataJson["matriculaEstagiario"];

    const link = `${TCE_URL}/?id=${id}`;

    await copyToClipboard(link);

    //navigator.clipboard.writeText(link).then(() => alert("Link copiado!"));
  } catch (error) {
    console.log("Erro na requisição. Interrompendo execução...");
    return; // Evita que o código seguinte seja executado
  }

  console.log("Esta linha só será executada se não houver erro!");
}

async function copyToClipboard(text) {
  // Modern approach using Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Tentativa 1 -> Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Tentativa 1 -> Failed to copy text: ", err);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("Tentativa 2 -> Text copied to clipboard");
    } catch (err) {
      console.error("Tentativa 2 -> Failed to copy text: ", err);
    }
    document.body.removeChild(textArea);
  }
}
