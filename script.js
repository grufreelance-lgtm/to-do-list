const STORAGE_KEY = 'ledger-tasks';
let tasks = [];

const listEl = document.getElementById('task-list');
const formEl = document.getElementById('add-form');
const inputEl = document.getElementById('new-task');
const countEl = document.getElementById('count');
const emptyEl = document.getElementById('empty-msg');

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(raw)) tasks = raw;
  } catch (e) { tasks = []; }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  listEl.innerHTML = '';
  emptyEl.style.display = tasks.length ? 'none' : 'block';

  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';

    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = String(i + 1).padStart(2, '0');

    const check = document.createElement('button');
    check.className = 'check' + (task.done ? ' done' : '');
    check.setAttribute('aria-label', task.done ? 'Mark as not done' : 'Mark as done');
    check.onclick = () => { task.done = !task.done; save(); render(); };

    const text = document.createElement('div');
    text.className = 'task-text';
    text.textContent = task.text;
    text.setAttribute('tabindex', '0');

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    editBtn.onclick = () => startEdit(text, task);

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'delete';
    delBtn.onclick = () => { tasks.splice(i, 1); save(); render(); };

    actions.append(editBtn, delBtn);
    li.append(num, check, text, actions);
    listEl.appendChild(li);
  });

  countEl.textContent = `${tasks.length} ${tasks.length === 1 ? 'entry' : 'entries'}`;
}

function startEdit(textEl, task) {
  textEl.contentEditable = 'true';
  textEl.focus();
  placeCursorAtEnd(textEl);

  function finish() {
    const newVal = textEl.textContent.trim();
    task.text = newVal || task.text;
    textEl.contentEditable = 'false';
    textEl.removeEventListener('blur', finish);
    textEl.removeEventListener('keydown', onKey);
    save();
    render();
  }

  function onKey(e) {
    if (e.key === 'Enter') { e.preventDefault(); textEl.blur(); }
    if (e.key === 'Escape') { textEl.textContent = task.text; textEl.blur(); }
  }

  textEl.addEventListener('blur', finish);
  textEl.addEventListener('keydown', onKey);
}

function placeCursorAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = inputEl.value.trim();
  if (!val) return;
  tasks.push({ text: val, done: false });
  inputEl.value = '';
  save();
  render();
});

load();
render();
