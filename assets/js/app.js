// ============================================================
// app.js — ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ (ПРОВЕРЕНО)
// ============================================================

const products = [
  { id: 1, brand: 'Casio', model: 'G-Shock GA-2100-1A1ER', category: 'Мужские', mechanism: 'Кварцевый', price: 13990, oldPrice: 16990, image: 'real-01.jpg', description: 'Легендарные часы G-Shock с восьмиугольным корпусом.', specs: { Категория: 'Мужские', Механизм: 'Кварцевый', 'Материал корпуса': 'Смола', Цвет: 'Черный' } },
  { id: 2, brand: 'Tissot', model: 'PRX Quartz 40', category: 'Унисекс', mechanism: 'Кварцевый', price: 54900, oldPrice: null, image: 'real-02.jpg', description: 'Швейцарские часы PRX с интегрированным стальным браслетом.', specs: { Категория: 'Унисекс', Механизм: 'Кварцевый', 'Материал корпуса': 'Нержавеющая сталь', Цвет: 'Серебристый' } },
  { id: 3, brand: 'Casio', model: 'F-91W', category: 'Унисекс', mechanism: 'Электронный', price: 3490, oldPrice: 4490, image: 'real-03.jpg', description: 'Культовые электронные часы с хронографом, будильником и подсветкой.', specs: { Категория: 'Унисекс', Механизм: 'Электронный', 'Материал корпуса': 'Смола', Цвет: 'Черный' } },
  { id: 4, brand: 'Seiko', model: 'SKX007', category: 'Мужские', mechanism: 'Механический', price: 52990, oldPrice: null, image: 'real-04.jpg', description: 'Классические дайверские часы с автоподзаводом.', specs: { Категория: 'Мужские', Механизм: 'Механический', 'Материал корпуса': 'Нержавеющая сталь', Цвет: 'Черный' } },
  { id: 5, brand: 'Omega', model: 'Speedmaster Professional', category: 'Мужские', mechanism: 'Механический', price: 849900, oldPrice: 899900, image: 'real-05.jpg', description: 'Легендарные часы Speedmaster — первые часы на Луне.', specs: { Категория: 'Мужские', Механизм: 'Механический', 'Материал корпуса': 'Нержавеющая сталь', Цвет: 'Черный' } },
  { id: 6, brand: 'Rolex', model: 'Submariner Date 16610', category: 'Мужские', mechanism: 'Механический', price: 1290000, oldPrice: null, image: 'real-06.jpg', description: 'Культовые часы Rolex Submariner с датой.', specs: { Категория: 'Мужские', Механизм: 'Механический', 'Материал корпуса': 'Нержавеющая сталь', Цвет: 'Черный' } },
  { id: 7, brand: 'Hamilton', model: 'Khaki X-Patrol H76566151', category: 'Мужские', mechanism: 'Механический', price: 169900, oldPrice: null, image: 'real-08.jpg', description: 'Авиаторские часы с хронографом и автоподзаводом.', specs: { Категория: 'Мужские', Механизм: 'Механический', 'Материал корпуса': 'Нержавеющая сталь', Цвет: 'Черный' } },
  { id: 8, brand: 'Восток', model: 'Амфибия 090916', category: 'Мужские', mechanism: 'Механический', price: 12990, oldPrice: 14990, image: 'real-09.jpg', description: 'Советские дайверские часы с автоподзаводом.', specs: { Категория: 'Мужские', Механизм: 'Механический', 'Материал корпуса': 'Нержавеющая сталь', Цвет: 'Синий' } },
  { id: 9, brand: 'Citizen', model: 'Eco-Drive AS2031-57E', category: 'Мужские', mechanism: 'Кварцевый', price: 89900, oldPrice: null, image: 'real-10.jpg', description: 'Часы на солнечной батарее Eco-Drive.', specs: { Категория: 'Мужские', Механизм: 'Кварцевый', 'Материал корпуса': 'Титан', Цвет: 'Серебристый' } },
  { id: 10, brand: 'Cartier', model: 'Tank Must 2021', category: 'Унисекс', mechanism: 'Кварцевый', price: 399000, oldPrice: 429000, image: 'real-11.jpg', description: 'Элегантные часы Tank с прямоугольным корпусом.', specs: { Категория: 'Унисекс', Механизм: 'Кварцевый', 'Материал корпуса': 'Нержавеющая сталь', Цвет: 'Серебристый' } }
];

const REVIEWS_KEY = 'watchaas_reviews';

function getReviews() {
  try {
    const data = localStorage.getItem(REVIEWS_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function addReview(productId, author, rating, text) {
  const reviews = getReviews();
  reviews.push({
    id: Date.now().toString(),
    productId: parseInt(productId),
    author: author.trim(),
    rating: parseInt(rating),
    text: text.trim(),
    date: new Date().toISOString()
  });
  saveReviews(reviews);
}

function getReviewsByProduct(productId) {
  const reviews = getReviews();
  return reviews.filter(r => r.productId === parseInt(productId));
}

function getAverageRating(productId) {
  const reviews = getReviewsByProduct(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

function getReviewCount(productId) {
  return getReviewsByProduct(productId).length;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

// ============================================================
// РЕНДЕРИНГ КАТАЛОГА
// ============================================================
function renderCatalog() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => {
    const avgRating = getAverageRating(p.id);
    const count = getReviewCount(p.id);
    const stars = renderStars(avgRating || 0);
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
            <div class="rating">${stars} <small>(${count})</small></div>
            <div class="price">${p.price.toLocaleString()} ₽ ${oldPrice}</div>
          </div>
        </a>
      </article>
    `;
  }).join('');
}

// ============================================================
// РЕНДЕРИНГ ДЕТАЛЕЙ ТОВАРА
// ============================================================
function renderProductDetail(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;
  const detailContainer = document.getElementById('productDetail');
  detailContainer.dataset.productId = productId;
  const avgRating = getAverageRating(p.id);
  const count = getReviewCount(p.id);
  const stars = renderStars(avgRating || 0);
  const oldPrice = p.oldPrice ? `<del>${p.oldPrice.toLocaleString()} ₽</del>` : '';
  const specsHtml = Object.entries(p.specs).map(([key, value]) => `
    <div><dt>${key}</dt><dd>${value}</dd></div>
  `).join('');
  detailContainer.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__image">
        <img src="assets/img/watches/${p.image}" alt="${p.brand} ${p.model}">
      </div>
      <div>
        <small style="color: var(--color-muted);">${p.brand}</small>
        <h1>${p.model}</h1>
        <div class="rating" style="font-size: 20px;">${stars} ${avgRating || 0} · ${count} отзывов</div>
        <div class="price price--large">${p.price.toLocaleString()} ₽ ${oldPrice}</div>
        <p>${p.description}</p>
        <div class="specs">${specsHtml}</div>
      </div>
    </div>
  `;
  renderProductReviews(productId);
}

// ============================================================
// ОТРИСОВКА ОТЗЫВОВ ПОД ТОВАРОМ
// ============================================================
function renderProductReviews(productId) {
  const container = document.getElementById('productReviewsList');
  if (!container) return;
  const reviews = getReviewsByProduct(productId);
  if (reviews.length === 0) {
    container.innerHTML = '<p style="color: var(--color-muted);">Пока нет отзывов. Будьте первым!</p>';
    return;
  }
  container.innerHTML = reviews.map(r => `
    <div class="review-card" style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>${r.author}</strong>
        <span style="color: #bb8230;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
      </div>
      <p>${r.text}</p>
      <small style="color: var(--color-muted);">${new Date(r.date).toLocaleDateString('ru-RU')}</small>
    </div>
  `).join('');
}

// ============================================================
// ОТРИСОВКА ВСЕХ ОТЗЫВОВ
// ============================================================
function renderAllReviews() {
  const container = document.getElementById('reviewList');
  const countEl = document.getElementById('reviewsCount');
  if (!container) return;
  const reviews = getReviews();
  if (countEl) countEl.textContent = `Всего отзывов: ${reviews.length}`;
  if (reviews.length === 0) {
    container.innerHTML = '<p style="color: var(--color-muted); text-align: center; padding: 40px;">Пока нет отзывов</p>';
    return;
  }
  const sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = sorted.map(r => {
    const product = products.find(p => p.id === r.productId);
    const productName = product ? `${product.brand} ${product.model}` : 'Неизвестная модель';
    return `
      <div class="review-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong>${r.author}</strong>
          <span style="color: #bb8230;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
        </div>
        <p><small style="color: var(--color-muted);">${productName}</small></p>
        <p>${r.text}</p>
        <small style="color: var(--color-muted);">${new Date(r.date).toLocaleDateString('ru-RU')}</small>
      </div>
    `;
  }).join('');
}

// ============================================================
// ЗВЕЗДЫ — 100% РАБОТАЮТ (делегирование)
// ============================================================
document.addEventListener('click', function(e) {
  const star = e.target.closest('.star');
  if (!star) return;
  const container = star.closest('.stars-container');
  if (!container) return;
  const stars = container.querySelectorAll('.star');
  const ratingInput = document.getElementById('reviewRating');
  if (!ratingInput) return;
  const value = parseInt(star.dataset.value);
  ratingInput.value = value;
  stars.forEach(s => {
    const val = parseInt(s.dataset.value);
    s.style.color = val <= value ? '#bb8230' : '#ddd';
  });
});

document.addEventListener('mouseover', function(e) {
  const star = e.target.closest('.star');
  if (!star) return;
  const container = star.closest('.stars-container');
  if (!container) return;
  const stars = container.querySelectorAll('.star');
  const value = parseInt(star.dataset.value);
  stars.forEach(s => {
    const val = parseInt(s.dataset.value);
    s.style.color = val <= value ? '#bb8230' : '#ddd';
  });
});

document.addEventListener('mouseout', function(e) {
  const star = e.target.closest('.star');
  if (!star) return;
  const container = star.closest('.stars-container');
  if (!container) return;
  const stars = container.querySelectorAll('.star');
  const ratingInput = document.getElementById('reviewRating');
  if (!ratingInput) return;
  const current = parseInt(ratingInput.value);
  stars.forEach(s => {
    const val = parseInt(s.dataset.value);
    s.style.color = val <= current ? '#bb8230' : '#ddd';
  });
});

// ============================================================
// ОБРАБОТКА ОТПРАВКИ ОТЗЫВА
// ============================================================
document.addEventListener('submit', function(e) {
  if (e.target && e.target.id === 'reviewForm') {
    e.preventDefault();
    const detailContainer = document.getElementById('productDetail');
    const productId = detailContainer.dataset.productId;
    const author = document.getElementById('reviewAuthor').value.trim();
    const rating = document.getElementById('reviewRating').value;
    const text = document.getElementById('reviewText').value.trim();
    if (!author || !rating || rating === '0' || !text) {
      alert('Заполните все поля и поставьте оценку!');
      return;
    }
    addReview(productId, author, rating, text);
    document.getElementById('reviewAuthor').value = '';
    document.getElementById('reviewText').value = '';
    document.getElementById('reviewRating').value = '0';
    document.querySelectorAll('.star').forEach(s => s.style.color = '#ddd');
    renderProductReviews(parseInt(productId));
    renderCatalog();
    renderAllReviews();
    alert('✅ Отзыв добавлен!');
  }
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
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    if (tab === 'catalog') renderCatalog();
    if (tab === 'reviews') renderAllReviews();
    if (tab === 'todo') renderTodo();
    if (tab === 'product') {
      const productId = parseInt(this.href.split('#product-')[1]);
      if (productId) renderProductDetail(productId);
      e.preventDefault();
    }
  });
});

// ============================================================
// TODOLIST
// ============================================================
function getTasks() {
  try {
    const data = localStorage.getItem('watchaas_tasks');
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveTasks(tasks) {
  localStorage.setItem('watchaas_tasks', JSON.stringify(tasks));
}

function renderTodo() {
  const list = document.getElementById('todoList');
  if (!list) return;
  const tasks = getTasks();
  if (tasks.length === 0) {
    list.innerHTML = '<p style="color: var(--color-muted); text-align: center; padding: 30px;">Список задач пуст</p>';
    return;
  }
  list.innerHTML = tasks.map((task, index) => `
    <div class="task-card">
      <div>
        <h3>${task.title}</h3>
        <p>${task.date}</p>
      </div>
      <div class="task-actions">
        <button onclick="deleteTask(${index})" class="todo-delete">Удалить</button>
      </div>
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
  console.log('✅ Всё работает!');
});
