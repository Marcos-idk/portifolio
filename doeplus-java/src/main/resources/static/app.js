const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const themeIcon = document.getElementById('themeIcon');
const form = document.getElementById('formDoacao');
const formMessage = document.getElementById('formMessage');
const listMessage = document.getElementById('listMessage');
const list = document.getElementById('listagem');
const type = document.getElementById('tipo');
const quantity = document.getElementById('quantidade');
const quantityLabel = document.getElementById('quantidadeLabel');
const search = document.getElementById('busca');
const statusFilter = document.getElementById('filtroStatus');
const submitButton = document.getElementById('submitButton');
const cancelEdit = document.getElementById('cancelEdit');
const dateInput = document.getElementById('data');
const tipoLabels = { DINHEIRO: 'Dinheiro', ALIMENTO: 'Alimentos', ROUPA: 'Roupas', HIGIENE: 'Higiene', OUTRO: 'Outros itens' };
let doacoes = [];

function refreshTheme() {
  const dark = root.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  themeLabel.textContent = dark ? 'Tema claro' : 'Tema escuro';
  themeIcon.textContent = dark ? '☀' : '☾';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = dark ? '#171f1b' : '#f7f7f1';
}
refreshTheme();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('doeplus-theme', root.dataset.theme); } catch {}
  refreshTheme();
});

function todayLocal() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}
dateInput.max = todayLocal();
dateInput.value = todayLocal();

function updateQuantityField() {
  const monetary = type.value === 'DINHEIRO';
  quantityLabel.textContent = monetary ? 'Valor (R$)' : 'Quantidade (unidades)';
  quantity.step = monetary ? '0.01' : '1';
  quantity.min = monetary ? '0.01' : '1';
  quantity.placeholder = monetary ? '0,00' : '0';
}
type.addEventListener('change', () => { quantity.value = ''; updateQuantityField(); });
updateQuantityField();

const brl = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value || 0));
const asDate = value => {
  const [y, m, d] = String(value || '').split('-');
  return y && m && d ? `${d}/${m}/${y}` : value;
};

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers }
    });
  } catch {
    throw new Error('Não foi possível acessar o servidor Java. Verifique se o Doe+ está em execução.');
  }
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.mensagem || 'Não foi possível concluir a operação.');
  return body;
}

function elem(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text !== undefined) el.textContent = String(text);
  return el;
}
function makeButton(text, action, id, danger = false) {
  const button = elem('button', `small-btn${danger ? ' danger' : ''}`, text);
  button.type = 'button';
  button.dataset.action = action;
  button.dataset.id = String(id);
  return button;
}

function renderList() {
  const term = search.value.trim().toLocaleLowerCase('pt-BR');
  const status = statusFilter.value;
  const filtered = doacoes.filter(d => (status === 'TODOS' || d.status === status) && d.doador.toLocaleLowerCase('pt-BR').includes(term));
  list.replaceChildren();
  if (!filtered.length) {
    const empty = elem('div', 'empty');
    empty.append(elem('span', 'empty-flower', '✳'), elem('h3', null, doacoes.length ? 'Nenhum registro encontrado' : 'Sua lista começa aqui'));
    empty.append(elem('p', null, doacoes.length ? 'Tente alterar os filtros de pesquisa.' : 'Registre uma doação para começar a acompanhar sua comunidade.'));
    list.append(empty);
    return;
  }
  for (const doacao of filtered) {
    const item = elem('article', 'donation-item');
    const identity = elem('div', 'identity');
    identity.append(elem('h3', 'donation-name', doacao.doador));
    const details = elem('div', 'donation-detail');
    details.append(elem('span', null, tipoLabels[doacao.tipo] || doacao.tipo));
    details.append(elem('span', null, doacao.tipo === 'DINHEIRO' ? brl(doacao.quantidade) : `${Number(doacao.quantidade)} un.`));
    details.append(elem('span', null, asDate(doacao.data)));
    identity.append(details);
    if (doacao.observacao) identity.append(elem('p', 'donation-notes', doacao.observacao));
    const actions = elem('div', 'donation-actions');
    actions.append(elem('span', `pill${doacao.status === 'PENDENTE' ? ' pending' : ''}`, doacao.status === 'RECEBIDA' ? 'Recebida' : 'Pendente'));
    if (doacao.status === 'PENDENTE') actions.append(makeButton('Receber', 'receber', doacao.id));
    actions.append(makeButton('Editar', 'editar', doacao.id));
    actions.append(makeButton('Excluir', 'excluir', doacao.id, true));
    item.append(identity, actions);
    list.append(item);
  }
}

async function carregar() {
  const [registros, resumo] = await Promise.all([request('/api/doacoes'), request('/api/resumo')]);
  doacoes = registros;
  document.getElementById('totalDoacoes').textContent = resumo.totalDoacoes;
  document.getElementById('totalRecebidas').textContent = resumo.recebidas;
  document.getElementById('totalPendentes').textContent = resumo.pendentes;
  document.getElementById('valorRecebido').textContent = brl(resumo.valorRecebido);
  listMessage.textContent = '';
  renderList();
}

function resetForm() {
  form.reset();
  document.getElementById('doacaoId').value = '';
  dateInput.value = todayLocal();
  updateQuantityField();
  document.getElementById('formTitle').textContent = 'Nova doação.';
  submitButton.firstChild.textContent = 'Salvar doação ';
  cancelEdit.hidden = true;
}

function showMessage(text, error = false) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${error ? 'error' : 'success'}`;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  showMessage('');
  if (!form.reportValidity()) return;
  const body = {
    doador: document.getElementById('doador').value.trim(),
    tipo: type.value,
    quantidade: Number(quantity.value),
    data: dateInput.value,
    status: document.getElementById('status').value,
    observacao: document.getElementById('observacao').value.trim()
  };
  if (!body.doador || !Number.isFinite(body.quantidade) || body.quantidade <= 0) {
    showMessage('Preencha um nome e uma quantidade válida.', true);
    return;
  }
  const id = document.getElementById('doacaoId').value;
  submitButton.disabled = true;
  try {
    await request(id ? `/api/doacoes/${id}` : '/api/doacoes', { method: id ? 'PUT' : 'POST', body: JSON.stringify(body) });
    resetForm();
    showMessage(id ? 'Registro atualizado com sucesso.' : 'Doação registrada com sucesso.');
    await carregar();
  } catch (error) {
    showMessage(error.message, true);
  } finally {
    submitButton.disabled = false;
  }
});

list.addEventListener('click', async event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  const doacao = doacoes.find(d => d.id === id);
  if (!doacao) return;
  const action = button.dataset.action;
  if (action === 'editar') {
    document.getElementById('doacaoId').value = doacao.id;
    document.getElementById('doador').value = doacao.doador;
    type.value = doacao.tipo;
    updateQuantityField();
    quantity.value = doacao.quantidade;
    dateInput.value = doacao.data;
    document.getElementById('status').value = doacao.status;
    document.getElementById('observacao').value = doacao.observacao || '';
    document.getElementById('formTitle').textContent = 'Editar doação.';
    submitButton.firstChild.textContent = 'Salvar alterações ';
    cancelEdit.hidden = false;
    showMessage('');
    document.getElementById('nova-doacao').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('doador').focus({ preventScroll: true });
    return;
  }
  if (action === 'excluir' && !confirm(`Excluir a doação de ${doacao.doador}? Esta ação não pode ser desfeita.`)) return;
  button.disabled = true;
  try {
    if (action === 'receber') {
      await request(`/api/doacoes/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'RECEBIDA' }) });
    } else if (action === 'excluir') {
      await request(`/api/doacoes/${id}`, { method: 'DELETE' });
    }
    if (String(id) === document.getElementById('doacaoId').value) resetForm();
    await carregar();
  } catch (error) {
    listMessage.textContent = error.message;
    listMessage.className = 'list-message error';
    button.disabled = false;
  }
});

cancelEdit.addEventListener('click', () => { resetForm(); showMessage(''); });
search.addEventListener('input', renderList);
statusFilter.addEventListener('change', renderList);
carregar().catch(error => {
  list.replaceChildren(elem('div', 'empty', error.message));
  listMessage.textContent = error.message;
  listMessage.className = 'list-message error';
});
