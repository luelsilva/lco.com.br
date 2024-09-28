

// Função para definir o mês e ano atuais ao carregar a página
window.onload = function() {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth(); // Retorna o mês atual (0 a 11)
  const anoAtual = dataAtual.getFullYear(); // Retorna o ano atual

  // Define o mês e o ano atual nos campos
  document.getElementById("mes").value = mesAtual;
  document.getElementById("ano").value = anoAtual;
}

// Seleciona o formulário pelo ID
const form = document.getElementById('formCarta');

// Adiciona um event listener para o evento de submissão do formulário
form.addEventListener('submit', function (event) {
  // Impede o envio do formulário
  event.preventDefault();

  // Chama a função desejada
  imprimir();
});

async function imprimir() {

  var nomeAluno = document.getElementById('nomeAluno').value.toUpperCase();
  var matriculaAluno = document.getElementById('matriculaAluno').value;
  var cargaHoraria = document.getElementById('cargaHoraria').value;
  var curso = document.getElementById('curso').value;

  /*
  if (!nomeAluno || !matriculaAluno || !cargaHoraria || !curso) {
      return;
  }
*/

  document.getElementById('print_nome_aluno').innerHTML = nomeAluno;
  document.getElementById('print_matricula_aluno').innerHTML = document.getElementById('matriculaAluno').value;

  var selectElement = document.getElementById("curso");
  var selectedIndex = selectElement.selectedIndex;
  var selectedText = selectElement.options[selectedIndex].text;

  document.getElementById('print_nome_curso').innerHTML = selectedText;
  document.getElementById('print_carga_horaria').innerHTML = document.getElementById('cargaHoraria').value;
  document.getElementById('print_data_atual').innerHTML = "Joinville, " + getDataAtual();

  var result = await buscarDados();

  if (result) {
    document.getElementById('print_nome_professor').innerHTML = "Dados do orientador de estágio: " + result[3];
    document.getElementById('print_matricula_professor').innerHTML = "Matrícula: " + result[2];
    document.getElementById('print_email_professor').innerHTML = "E-mail: " + result[4];

    window.print();
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
    dia = '0' + dia;
  }
  if (mes < 10) {
    mes = '0' + mes;
  }

  return dia + '/' + mes + '/' + ano;
};

async function buscarDados() {
  const selecao = document.getElementById('curso');
  const chaveSelecionada = selecao.value;

  try {
    const resposta = await fetch(cursoURL);
    const texto = await resposta.text();

    const linhas = texto.split('\n');
    let resultado = null;

    for (const linha of linhas) {
      const colunas = linha.split(',');

      if (colunas[0] === chaveSelecionada) {
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
    alert("Erro ao buscar dados");
  }
}