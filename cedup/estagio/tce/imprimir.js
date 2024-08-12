import { formataData } from './util';

// recebe um JSON e prepara a impressão
export async function imprimir(formObject) {

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
