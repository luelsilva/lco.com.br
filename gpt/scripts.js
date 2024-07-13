// exemplos from GPT

// cria uma lista com todas as palavras entre ${ e }
function pegaVariaveis() {

  // Obter o elemento da div
  var div = document.getElementById('print');

  // Obter o conteúdo da div como texto
  var text = div.textContent || div.innerText;

  // Usar uma expressão regular para encontrar todas as palavras entre ${ e }
  var matches = text.match(/\${(.*?)}/g);

  // Remover os caracteres ${ e }
  var variables = matches.map(function (item) {
    return item.replace(/\${|}/g, '');
  });

  // Converter a lista em uma string separada por vírgulas
  var result = variables.join(', ');

  // Exibir o resultado no console (ou você pode fazer outra coisa com ele)
  console.log(matches);

}