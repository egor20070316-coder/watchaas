// ============================================================
// app.js — ПРОСТО РАБОТАЕТ
// ============================================================

const products = [
  { id: 1, brand: 'Casio', model: 'G-Shock GA-2100-1A1ER', category: 'Мужские', mechanism: 'Кварцевый', price: 13990, oldPrice: 16990, image: 'real-01.jpg' },
  { id: 2, brand: 'Tissot', model: 'PRX Quartz 40', category: 'Унисекс', mechanism: 'Кварцевый', price: 54900, oldPrice: null, image: 'real-02.jpg' },
  { id: 3, brand: 'Casio', model: 'F-91W', category: 'Унисекс', mechanism: 'Электронный', price: 3490, oldPrice: 4490, image: 'real-03.jpg' },
  { id: 4, brand: 'Seiko', model: 'SKX007', category: 'Мужские', mechanism: 'Механический', price: 52990, oldPrice: null, image: 'real-04.jpg' },
  { id: 5, brand: 'Omega', model: 'Speedmaster Professional', category: 'Мужские', mechanism: 'Механический', price: 849900, oldPrice: 899900, image: 'real-05.jpg' },
  { id: 6, brand: 'Rolex', model: 'Submariner Date 16610', category: 'Мужские', mechanism: 'Механический', price: 1290000, oldPrice: null, image: 'real-06.jpg' },
  { id: 7, brand: 'Hamilton', model: 'Khaki X-Patrol H76566151', category: 'Мужские', mechanism: 'Механический', price: 169900, oldPrice: null, image: 'real-08.jpg' },
  { id: 8, brand: 'Восток', model: 'Амфибия 090916', category: 'Мужские', mechanism: 'Механический', price: 12990, oldPrice: 14990, image: 'real-09.jpg' },
  { id: 9, brand: 'Citizen', model: 'Eco-Drive AS2031-57E', category: 'Мужские', mechanism: 'Кварцевый', price: 89900, oldPrice: null, image: 'real-10.jpg' },
  { id: 10, brand: 'Cartier', model: 'Tank Must 2021', category: 'Унисекс', mechanism: 'Кварцевый', price: 399000, oldPrice: 429000, image: 'real-11.jpg' }
];

function renderCatalog() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => {
    const oldPrice = p.oldPrice ? `<del>${p.oldPrice.toLocaleString()} ₽</del>` : '';
    return `
      <article class="product-card">
        <a class="product-card__link" href="#product-${p.id}" data-product-id="${p.id}">
          <span class="product-card__image">
            <img src="assets/img/watches/${p.image}" alt="${p.brand} ${p.model}">
          </span>
          <div class="product-card__body">
            <small>${p.brand}</small>
            <h3>${p.model}</h3>
            <p>${p.category} · ${p.mechanism}</p>
            <div class="price">${p.price.toLocaleString()} ₽ ${oldPrice}</div>
          </div>
        </a>
      </article>
    `;
  }).join('');
}

function renderProductDetail(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;
  const container = document.getElementById('productDetail');
  const oldPrice = p.oldPrice ? `<del>${p.oldPrice.toLocaleString()} ₽</del>` : '';
  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__image">
        <img src="assets/img/watches/${p.image}" alt="${p.brand} ${p.model}">
      </div>
      <div>
        <h1>${p.brand} ${p.model}</h1>
        <div class="price price--large">${p.price.toLocaleString()} ₽ ${oldPrice}</div>
        <p>${p.category} · ${p.mechanism}</p>
      </div>
    </div>
  `;
}

document.querySelectorAll('[data-tab]').forEach(link => {
  link.addEventListener('click', function(e) {
    const tab = this.dataset.tab;
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
    document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
    if (tab === 'catalog') renderCatalog();
    if (tab === 'todo') renderTodo();
    if (tab === 'product') {
      const id = parseInt(this.href.split('#product-')[1]);
      if (id) renderProductDetail(id);
      e.preventDefault();
    }
  });
});

// ============================================================
// TODOLIST
// ============================================================
function getTasks() {
  try { return JSON.parse(localStorage.getItem('watchaas_tasks')) || []; }
  catch { return []; }
}

function saveTasks(tasks) {
  localStorage.setItem('watchaas_tasks', JSON.stringify(tasks));
}

function renderTodo() {
  const list = document.getElementById('todoList');
  if (!list) return;
  const tasks = getTasks();
  if (!tasks.length) {
    list.innerHTML = '<p style="color: var(--color-muted);">Список задач пуст</p>';
    return;
  }
  list.innerHTML = tasks.map((t, i) => `
    <div class="task-card">
      <div><h3>${t.title}</h3><p>${t.date}</p></div>
      <button onclick="deleteTask(${i})" class="todo-delete">Удалить</button>
    </div>
  `).join('');
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTodo();
}

document.getElementById('todoForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('todoTitle').value.trim();
  const date = document.getElementById('todoDate').value;
  if (!title || !date) return;
  const tasks = getTasks();
  tasks.push({ title, date });
  saveTasks(tasks);
  renderTodo();
  this.reset();
});

document.addEventListener('DOMContentLoaded', function() {
  renderCatalog();
  renderTodo();
});

console.log('✅ Каталог работает');
