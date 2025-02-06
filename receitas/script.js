const API_URL = 'http://localhost:5000/api/receitas/';

async function carregarReceitas() {
  const res = await fetch(API_URL);
  const receitas = await res.json();

  const lista = document.getElementById('lista-receitas');
  lista.innerHTML = '';

  receitas.forEach((receita) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'cursor-pointer');
    item.innerText = receita.titulo;
    item.onclick = () => carregarReceita(receita.id);
    lista.appendChild(item);
  });
}

async function carregarReceita(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const receita = await res.json();

  document.getElementById('receita-id').value = receita.id;
  document.getElementById('titulo').value = receita.titulo;
  document.getElementById('descricao').value = receita.descricao;
}

async function salvarReceita(e) {
  e.preventDefault();

  const id = document.getElementById('receita-id').value;
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;

  const receita = { titulo, descricao };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(receita),
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(receita),
    });
  }

  carregarReceitas();
}

async function excluirReceita() {
  const id = document.getElementById('receita-id').value;
  if (!id) return;

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  carregarReceitas();
}

document
  .getElementById('form-receita')
  .addEventListener('submit', salvarReceita);
window.onload = carregarReceitas;
