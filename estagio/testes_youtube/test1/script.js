const script_do_google = 'https://script.google.com/macros/s/AKfycbzveUkdDTn6Nu7bXpIDjUFfQ9Sh50a3JJAX6DP-u_TbGyeqimtWnwZmzl5QrOMFPYUeWw/exec';
const dados_do_formulario = document.getElementsByName['formulario-contato'];

dados_do_formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  console.log('teste');

  return
  
  fetch(script_do_google, { method: 'POST', body: new FormData(dados_do_formulario) })
    .then(response => {
      alert('Dados enviados com sucesso!', response);
      dados_do_formulario.reset();
    })
    .catch(error => console.error('Erro no envio dos dados!', error));
})
