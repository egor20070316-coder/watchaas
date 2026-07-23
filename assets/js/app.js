// ============================================================
// app.js — ФИНАЛ (РАБОТАЕТ 100%)
// ============================================================

const products = [
  { id: 1, brand: 'Casio', model: 'G-Shock GA-2100-1A1ER', price: 13990, oldPrice: 16990, image: 'real-01.jpg', description: 'Ударопрочные, водонепроницаемые.' },
  { id: 2, brand: 'Tissot', model: 'PRX Quartz 40', price: 54900, oldPrice: null, image: 'real-02.jpg', description: 'Швейцарские часы с интегрированным браслетом.' },
  { id: 3, brand: 'Casio', model: 'F-91W', price: 3490, oldPrice: 4490, image: 'real-03.jpg', description: 'Культовые электронные часы.' },
  { id: 4, brand: 'Seiko', model: 'SKX007', price: 52990, oldPrice: null, image: 'real-04.jpg', description: 'Дайверские часы с автоподзаводом.' },
  { id: 5, brand: 'Omega', model: 'Speedmaster Professional', price: 849900, oldPrice: 899900, image: 'real-05.jpg', description: 'Первые часы на Луне.' },
  { id: 6, brand: 'Rolex', model: 'Submariner Date 16610', price: 1290000, oldPrice: null, image: 'real-06.jpg', description: 'Культовые часы с датой.' },
  { id: 7, brand: 'Hamilton', model: 'Khaki X-Patrol H76566151', price: 169900, oldPrice: null, image: 'real-08.jpg', description: 'Авиаторские часы с хронографом.' },
  { id: 8, brand: 'Восток', model: 'Амфибия 090916', price: 12990, oldPrice: 14990, image: 'real-09.jpg', description: 'Советские дайверские часы.' },
  { id: 9, brand: 'Citizen', model: 'Eco-Drive AS2031-57E', price: 89900, oldPrice: null, image: 'real-10.jpg', description: 'Часы на солнечной батарее.' },
  { id: 10, brand: 'Cartier', model: 'Tank Must 2021', price: 399000, oldPrice: 429000, image: 'real-11.jpg', description: 'Элегантные часы с прямоугольным корпусом.' }
];

const REVIEWS_KEY = 'watchaas_reviews';

// ============================================================
// РАБОТА С ОТЗЫВАМИ
// ============================================================
function getReviews() {
  try { return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || []; } 
  catch { return []; }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function addReview(productId, author, rating, text) {
  const reviews = getReviews();
  reviews.push({
    id: Date.now(),
    productId: productId,
    author: author.trim(),
    rating: parseInt(rating),
    text: text.trim(),
    date: new Date().toISOString()
  });
  saveReviews(reviews);
}

function getReviewsByProduct(productId) {
  return getReviews().filter(r => r.productId === productId);
}

function getAvgRating(productId) {
  const r = getReviewsByProduct(productId);
  if (!r.length) return 0;
  return Math.round((r.reduce((a, b) => a + b.rating, 0) / r.length) * 10) / 10;
}

function getCount(productId) {
  return getReviewsByProduct(productId).length;
}

function renderStars(rating) {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

// ============================================================
// РЕНДЕР КАТАЛОГА
// ============================================================
function renderCatalog() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => {
    const avg = getAvgRating(p.id);
    const count = getCount(p.id);
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
            <div class="rating">${renderStars(avg)} <small>(${count})</small></div>
            <div class="price">${p.price.toLocaleString()} ₽ ${oldPrice}</div>
          </div>
        </a>
      </article>
    `;
  }).join('');
}

// ============================================================
// РЕНДЕР ДЕТАЛЕЙ
// ============================================================
function renderProductDetail(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;
  const container = document.getElementById('productDetail');
  container.dataset.productId = productId;
  const avg = getAvgRating(p.id);
  const count = getCount(p.id);
  const oldPrice = p.oldPrice ? `<del>${p.oldPrice.toLocaleString()} ₽</del>` : '';
  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__image">
        <img src="assets/img/watches/${p.image}" alt="${p.brand} ${p.model}">
      </div>
      <div>
        <h1>${p.brand} ${p.model}</h1>
        <div class="rating" style="font-size:20px;">${renderStars(avg)} ${avg} · ${count} отзывов</div>
        <div class="price price--large">${p.price.toLocaleString()} ₽ ${oldPrice}</div>
        <p>${p.description}</p>
      </div>
    </div>
  `;
  renderProductReviews(productId);
}

// ============================================================
// ОТЗЫВЫ ПОД ТОВАРОМ
// ============================================================
function renderProductReviews(productId) {
  const container = document.getElementById('productReviewsList');
  if (!container) return;
  const reviews = getReviewsByProduct(productId);
  if (!reviews.length) {
    container.innerHTML = '<p style="color: var(--color-muted);">Пока нет отзывов. Будьте первым!</p>';
    return;
  }
  container.innerHTML = reviews.slice().reverse().map(r => `
    <div class="review-card" style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between;">
        <strong>${r.author}</strong>
        <span>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
      </div>
      <p>${r.text}</p>
      <small style="color: var(--color-muted);">${new Date(r.date).toLocaleDateString()}</small>
    </div>
  `).join('');
}

// ============================================================
// ВСЕ ОТЗЫВЫ
// ============================================================
function renderAllReviews() {
  const container = document.getElementById('reviewList');
  if (!container) return;
  const reviews = getReviews();
  const countEl = document.getElementById('reviewsCount');
  if (countEl) countEl.textContent = `Всего отзывов: ${reviews.length}`;
  if (!reviews.length) {
    container.innerHTML = '<p style="color: var(--color-muted); text-align: center;">Пока нет отзывов</p>';
    return;
  }
  container.innerHTML = reviews.slice().reverse().map(r => {
    const p = products.find(x => x.id === r.productId);
    return `
      <div class="review-card">
        <div style="display: flex; justify-content: space-between;">
          <strong>${r.author}</strong>
          <span>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
        </div>
        <p><small style="color: var(--color-muted);">${p ? p.brand + ' ' + p.model : ''}</small></p>
        <p>${r.text}</p>
        <small style="color: var(--color-muted);">${new Date(r.date).toLocaleDateString()}</small>
      </div>
    `;
  }).join('');
}

// ============================================================
// ЗВЕЗДЫ — ПРОСТО И НАДЕЖНО
// ============================================================
function initStars() {
  const stars = document.querySelectorAll('.star');
  const input = document.getElementById('reviewRating');
  if (!stars.length || !input) return;
  
  stars.forEach(star => {
    star.onclick = function() {
      const val = parseInt(this.dataset.value);
      input.value = val;
      stars.forEach(s => {
        s.style.color = parseInt(s.dataset.value) <= val ? '#b68b4c' : '#ddd';
      });
    };
    star.onmouseenter = function() {
      const val = parseInt(this.dataset.value);
      stars.forEach(s => {
        s.style.color = parseInt(s.dataset.value) <= val ? '#b68b4c' : '#ddd';
      });
    };
    star.onmouseleave = function() {
      const val = parseInt(input.value);
      stars.forEach(s => {
        s.style.color = parseInt(s.dataset.value) <= val ? '#b68b4c' : '#ddd';
      });
    };
  });
}

// ============================================================
// ОТПРАВКА ОТЗЫВА
// ============================================================
document.getElementById('reviewForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const container = document.getElementById('productDetail');
  const productId = parseInt(container.dataset.productId);
  const author = document.getElementById('reviewAuthor').value.trim();
  const rating = document.getElementById('reviewRating').value;
  const text = document.getElementById('reviewText').value.trim();
  
  if (!author || !rating || rating === '0' || !text) {
    alert('Заполните все поля!');
    return;
  }
  
  addReview(productId, author, rating, text);
  this.reset();
  document.querySelectorAll('.star').forEach(s => s.style.color = '#ddd');
  document.getElementById('reviewRating').value = '0';
  
  renderProductReviews(productId);
  renderCatalog();
  renderAllReviews();
  alert('✅ Отзыв добавлен!');
});

// ============================================================
// НАВИГАЦИЯ
// ============================================================
document.querySelectorAll('[data-tab]').forEach(link => {
  link.addEventListener('click', function(e) {
    const tab = this.dataset.tab;
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
    document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
    
    if (tab === 'catalog') renderCatalog();
    if (tab === 'reviews') renderAllReviews();
    if (tab === 'todo') renderTodo();
    if (tab === 'product') {
      const id = parseInt(this.href.split('#product-')[1]);
      if (id) {
        renderProductDetail(id);
        setTimeout(initStars, 100);
      }
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

// ============================================================
// ЗАПУСК
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  renderCatalog();
  renderAllReviews();
  renderTodo();
  setTimeout(initStars, 300);
});

console.log('✅ Всё работает!');
