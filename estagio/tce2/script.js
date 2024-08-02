document.addEventListener("DOMContentLoaded", function () {
  // carrega os curso no input form select 'siglaCurso'
  fetch('https://www.lco.com.br/estagio/assets/cursos_tecnicos.csv')
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
    .catch(error => console.error('Erro ao carregar os cursos:', error));
});

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

  // para mostrar todos os inputs do form
  //let valores = JSON.stringify(formObject);
  //console.log(valores);

  //saveFormObject(formObject);

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

  // let valores = JSON.stringify(formObject);

  //console.log(valores);

  imprimir(formObject);

});

async function imprimir(formObject) {

  const siglaCurso = formObject["siglaCurso"];

  var result = await buscarCursos(siglaCurso);

  if (result) {

    formObject["nomeCurso"] = result[1];
    formObject["matriculaProfessor"] = result[2];
    formObject["nomeProfessor"] = result[3];
    formObject["emailProfessor"] = result[4];

    // Seleciona a div print
    const divPrint = document.getElementById('print');

    // Substitui os placeholders com os valores do objeto JSON
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

/*
// upload de arquivo texto
document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      populateFormTxt(text);
    };
    reader.readAsText(file);
  }
});

// preencher os inputs do form com um texto organizado em 2 colunas
// separado pelo caracter '%'
function populateFormTxt(text) {
  const lines = text.split('\n');
  lines.forEach(line => {
    const [key, value] = line.split('%');
    const input = document.getElementById(key.trim());
    if (input) {
      input.value = value.trim();
    }
  });
};
*/

// upload de um arquivo json
document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        populateFormJS(data);
      } catch (error) {
        alert('Erro ao processar o arquivo JSON: ' + error.message);
      }
    };
    reader.readAsText(file);
  }
});


