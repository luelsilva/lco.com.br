

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

  const nomeAluno = document.getElementById('nomeAluno').value.toUpperCase();
  const mes = document.getElementById('mes').value.toUpperCase();
  const ano = document.getElementById('ano').value;

  
  document.getElementById('print_nome_aluno').innerHTML = nomeAluno;
  
 
    window.print();
  
}

function gerarTabela() {
  // Obtém o mês e ano dos inputs
  const mes = document.getElementById("mes").value;
  const ano = document.getElementById("ano").value;
  
  // Cria um novo objeto de data com o primeiro dia do mês
  const data = new Date(ano, mes, 1);
  
  // Obtém o corpo da tabela
  const tbody = document.querySelector("#dynamicTable tbody");
  
  // Limpa as linhas anteriores da tabela, se houver
  tbody.innerHTML = "";

  // Enquanto o mês não mudar, vamos gerar as linhas da tabela
  while (data.getMonth() == mes) {
      const dia = data.getDate();
      const diaSemana = data.getDay(); // 0 para Domingo, 6 para Sábado
      
      // Cria uma nova linha
      const tr = document.createElement("tr");

      // Aplica a classe 'domingo' ou 'sabado' à linha, se for o caso
      if (diaSemana === 0) {
          tr.classList.add("domingo");
      } else if (diaSemana === 6) {
          tr.classList.add("sabado");
      }

      // Coluna do dia
      const tdDia = document.createElement("td");
      tdDia.textContent = dia;
      tr.appendChild(tdDia);
      
      // Coluna do nome do dia (sábado ou domingo)
      const tdNome = document.createElement("td");
      if (diaSemana === 0) {
          tdNome.textContent = "DOMINGO";
          tdNome.classList.add("domingo");
      } else if (diaSemana === 6) {
          tdNome.textContent = "SÁBADO";
          tdNome.classList.add("sabado");
      } else {
          tdNome.textContent = ""; // Dia útil
      }
      tr.appendChild(tdNome);
      
      // Colunas vazias para entrada, saída e rubrica
      for (let i = 0; i < 3; i++) {
          const tdVazio = document.createElement("td");
          tdVazio.textContent = ""; // Mantém em branco
          tr.appendChild(tdVazio);
      }

      // Adiciona a linha à tabela
      tbody.appendChild(tr);
      
      // Incrementa o dia
      data.setDate(dia + 1);
  }
}