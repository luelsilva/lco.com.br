

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