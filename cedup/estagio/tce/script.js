
//const cursoURL = 'https://www.lco.com.br/cedup/estagio/assets/cursos_tecnicos.csv';
const cursoURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vShZorYX2beBEdGmUYadD9rofdIPRH7GMZ2R8FjmAa0zWz1Mzs3q9Wmd_2iCM2UmUYjWd8wgSG7k5E8/pub?output=csv'

const printInnerHtml = document.getElementById('print');

// carrega cursos no form select 'siglaCurso'
document.addEventListener("DOMContentLoaded", function () {
  fetch(cursoURL)
    .then(response => response.text())
    .then(data => {
      const linhas = data.split('\n');
      // Ignora a primeira linha
      const linhasSemPrimeira = linhas.slice(1);
      const cursoSelect = document.getElementById('siglaCurso');
      linhasSemPrimeira.forEach(linha => {
        const colunas = linha.split(',');
        if (colunas.length >= 2) {
          const option = document.createElement('option');
          option.value = colunas[0].trim();
          option.textContent = colunas[1].trim();
          cursoSelect.appendChild(option);
        }
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os cursos:', error);
      alert('Erro ao carregar os cursos');
    });
});

// onClick do elemento loadBtn
document.getElementById('loadBtn').addEventListener('click', function () {
  document.getElementById('fileInput').click();
});

// onChange do elemento fileInput
document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        const form = document.getElementById('myForm');
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
              input.value = data[key];
            }
          }
        }
      } catch (error) {
        alert('Erro ao processar o arquivo JSON: ' + error.message);
      }
    };
    reader.readAsText(file);
  }
});

// salva o form
document.getElementById('saveBtn').addEventListener('click', function () {

  const form = document.getElementById('myForm');

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

  let fileName = 'Cedup-TCE-' + formDataJson['nomeEstagiario'];

  const jsonString = JSON.stringify(formDataJson, null, 2); // Converter objeto JSON para string
  const blob = new Blob([jsonString], { type: "application/json" }); // Criar um Blob com o conteúdo JSON
  const url = URL.createObjectURL(blob);  // Criar uma URL para o Blob

  // isso aqui é porque o chrome não abre o diálogo
  fileName = prompt("Entre o nome do arquivo para salvar:", fileName);

  if (fileName) {
    fileName = fileName + '.json';
    const a = document.createElement("a");  // Criar um elemento de link
    a.href = url;
    a.download = fileName;                  // Nome sugerido para o arquivo
    document.body.appendChild(a);           // Adicionar o link ao DOM
    a.click();                              // clicar nele para abrir a janela de diálogo "Salvar Como"
    document.body.removeChild(a);           // Remover o link do DOM
    URL.revokeObjectURL(url);               // Liberar a URL
  }
});

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

// funções de busca cep
function meu_callback_estagiario(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('enderecoEstagiario').value = (conteudo.logradouro);
    document.getElementById('numEnderEstagiario').value = ("");
    document.getElementById('bairroEstagiario').value = (conteudo.bairro);
    document.getElementById('cidadeEstagiario').value = (conteudo.localidade);
    document.getElementById('estadoEstagiario').value = (conteudo.uf);
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
    document.getElementById('enderecoEmpresa').value = (conteudo.logradouro);
    document.getElementById('numEnderEmpresa').value = ("");
    document.getElementById('bairroEmpresa').value = (conteudo.bairro);
    document.getElementById('cidadeEmpresa').value = (conteudo.localidade);
    document.getElementById('estadoEmpresa').value = (conteudo.uf);
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
    document.getElementById('enderecoEstagiario').value = ("");
    document.getElementById('numEnderEstagiario').value = ("");
    document.getElementById('bairroEstagiario').value = ("");
    document.getElementById('cidadeEstagiario').value = ("");
    document.getElementById('estadoEstagiario').value = ("");
  } else {
    //Limpa valores do formulário de cep.
    document.getElementById('enderecoEmpresa').value = ("");
    document.getElementById('numEnderEmpresa').value = ("");
    document.getElementById('bairroEmpresa').value = ("");
    document.getElementById('cidadeEmpresa').value = ("");
    document.getElementById('estadoEmpresa').value = ("");
  }
}
// funções de busca cep
function pesquisaCep(valor, quem) { // 1 para estagiario 2 para empresa

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {

      if (quem === 1) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('enderecoEstagiario').value = "...";
        document.getElementById('numEnderEstagiario').value = ("...");
        document.getElementById('bairroEstagiario').value = "...";
        document.getElementById('cidadeEstagiario').value = "...";
        document.getElementById('estadoEstagiario').value = "...";
      } else {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('enderecoEmpresa').value = "...";
        document.getElementById('numEnderEmpresa').value = ("...");
        document.getElementById('bairroEmpresa').value = "...";
        document.getElementById('cidadeEmpresa').value = "...";
        document.getElementById('estadoEmpresa').value = "...";
      }

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      if (quem === 1) {
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback_estagiario';
      } else {
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback_empresa';
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

// busca um curso pelo id do curso
// retorna um array [cursoID, cursoNome, profMatricula, profNome, profEmail]
async function getCursoByID(siglaCurso) {

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
    const divPrint = document.getElementById('print');

    // não substitui duas vezes, porque a palavra chava já foi substituída
    // em que carregar o texto novamente
    // Substitui os placeholders com os valores do objeto JSON
    console.log(printInnerHtml);
    
    divPrint.innerHTML = divPrint.innerHTML
      .replace('${nomeEstagiario}', formObject["nomeEstagiario"])
      .replace('${nomeCurso}', formObject["nomeCurso"])
      .replace('${matriculaEstagiario}', formObject["matriculaEstagiario"])
      .replace('${cpfEstagiario}', formObject["cpfEstagiario"])
      .replace('${telefoneEstagiario}', formObject["telefoneEstagiario"])
      .replace('${emailEstagiario}', formObject["emailEstagiario"])
      .replace('${dataNascimento}', await formataData(formObject["dataNascimento"]))
      .replace('${enderecoCompletoEstagiario}', formObject["enderecoCompletoEstagiario"])
      .replace('${deficiencia}', formObject["deficiencia"])
      .replace('${nomeProfessor}', formObject["nomeProfessor"])
      .replace('${matriculaProfessor}', formObject["matriculaProfessor"])
      .replace('${emailProfessor}', formObject["emailProfessor"])
      .replace('${nomeEmpresa}', formObject["nomeEmpresa"])
      .replace('${cnpj}', formObject["cnpj"])
      .replace('${enderecoCompletoEmpresa}', formObject["enderecoCompletoEmpresa"])
      .replace('${telefoneEmpresa}', formObject["telefoneEmpresa"])
      .replace('${emailEmpresa}', formObject["emailEmpresa"])
      .replace('${ramoAtividade}', formObject["ramoAtividade"])
      .replace('${representante}', formObject["representante"])
      .replace('${supervidor}', formObject["supervidor"])
      .replace('${cargo}', formObject["cargo"])
      .replace('${apolice}', formObject["apolice"])
      .replace('${seguradora}', formObject["seguradora"])
      .replace('${cnpjSeguradora}', formObject["cnpjSeguradora"])
      .replace('${dataInicio}', await formataData(formObject["dataInicio"]))
      .replace('${dataFim}', await formataData(formObject["dataFim"]))
      .replace('${dataAtual}', formObject["dataAtual"])
      .replace('${nomeEstagiario2}', formObject["nomeEstagiario"])
      .replace('${cpfEstagiario2}', formObject["cpfEstagiario"])
      .replace('${tipoEstagio}', formObject["tipoEstagio"])
      .replace('${dataInicio2}', await formataData(formObject["dataInicio"]))
      .replace('${dataFim2}', await formataData(formObject["dataFim"]))
      .replace('${horarioEstagio}', formObject["horarioEstagio"].replace(/\n/g, "<br>"))
      .replace('${cargaHorariaSemanal}', formObject["cargaHorariaSemanal"])
      .replace('${cargaHorariaTotal}', formObject["cargaHorariaTotal"])
      .replace('${apolice2}', formObject["apolice"])
      .replace('${bolsaAuxilio}', formObject["bolsaAuxilio"].replace(/\n/g, "<br>"))
      .replace('${atividades}', formObject["atividades"].replace(/\n/g, "<br>"))

    window.print();
  }
}

// Adiciona um event listener para o evento de submissão do formulário
document.getElementById('myForm').addEventListener('submit', function (event) {
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

  formObject["dataAtual"] = getDataAtual();

  imprimir(formObject);

});


