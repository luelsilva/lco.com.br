
// carrega cursos no form select 'siglaCurso'
document.addEventListener("DOMContentLoaded", function () {
    // carrega os curso no input form select 'siglaCurso'
    fetch('https://www.lco.com.br/cedup/estagio/assets/cursos_tecnicos.csv')
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