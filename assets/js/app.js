const products = [
  {
    id: 1,
    brand: 'Casio',
    name: 'G-Shock GA-2100-1A1ER',
    sku: 'GA-2100-1A1ER',
    category: 'Мужские',
    mechanism: 'Кварцевый',
    caseMaterial: 'Карбон и полимер',
    color: 'Чёрный',
    price: 13990,
    oldPrice: 16990,
    image: 'assets/img/watches/real-01.jpg',
    description: 'Ударопрочная аналогово-цифровая модель серии G-Shock с тонким восьмиугольным корпусом.'
  },
  {
    id: 2,
    brand: 'Tissot',
    name: 'PRX Quartz 40',
    sku: 'TIS-PRX-Q40',
    category: 'Унисекс',
    mechanism: 'Кварцевый',
    caseMaterial: 'Нержавеющая сталь',
    color: 'Серебристый',
    price: 54900,
    oldPrice: null,
    image: 'assets/img/watches/real-02.jpg',
    description: 'Швейцарские часы PRX с интегрированным стальным браслетом и лаконичным циферблатом.'
  },
  {
    id: 3,
    brand: 'Casio',
    name: 'F-91W',
    sku: 'F-91W-1',
    category: 'Унисекс',
    mechanism: 'Электронный',
    caseMaterial: 'Полимер',
    color: 'Чёрный',
    price: 3490,
    oldPrice: 4490,
    image: 'assets/img/watches/real-03.jpg',
    description: 'Легендарные компактные электронные часы с секундомером, будильником и подсветкой.'
  },
  {
    id: 4,
    brand: 'Seiko',
    name: 'SKX007',
    sku: 'SKX007',
    category: 'Мужские',
    mechanism: 'Механический',
    caseMaterial: 'Нержавеющая сталь',
    color: 'Чёрный',
    price: 52990,
    oldPrice: null,
    image: 'assets/img/watches/real-04.jpg',
    description: 'Японские автоматические часы для дайвинга с вращающимся безелем и читаемыми метками.'
  },
  {
    id: 5,
    brand: 'Omega',
    name: 'Speedmaster Professional',
    sku: 'OME-SPM-PRO',
    category: 'Мужские',
    mechanism: 'Механический',
    caseMaterial: 'Нержавеющая сталь',
    color: 'Чёрный',
    price: 849900,
    oldPrice: 899900,
    image: 'assets/img/watches/real-05.jpg',
    description: 'Культовый механический хронограф Speedmaster Professional со стальным корпусом.'
  },
  {
    id: 6,
    brand: 'Rolex',
    name: 'Submariner Date 16610',
    sku: '16610',
    category: 'Мужские',
    mechanism: 'Механический',
    caseMaterial: 'Нержавеющая сталь',
    color: 'Чёрный',
    price: 1290000,
    oldPrice: null,
    image: 'assets/img/watches/real-06.jpg',
    description: 'Автоматические часы для дайвинга Submariner Date с чёрным безелем и стальным браслетом.'
  },
  {
    id: 7,
    brand: 'Hamilton',
    name: 'Khaki X-Patrol H76566151',
    sku: 'H76566151',
    category: 'Мужские',
    mechanism: 'Механический',
    caseMaterial: 'Нержавеющая сталь',
    color: 'Серебристый',
    price: 169900,
    oldPrice: null,
    image: 'assets/img/watches/real-08.jpg',
    description: 'Автоматический швейцарский хронограф линейки Khaki с калибром H-21.'
  },
  {
    id: 8,
    brand: 'Восток',
    name: 'Амфибия 090916',
    sku: '090916',
    category: 'Мужские',
    mechanism: 'Механический',
    caseMaterial: 'Нержавеющая сталь',
    color: 'Синий',
    price: 12990,
    oldPrice: 14990,
    image: 'assets/img/watches/real-09.jpg',
    description: 'Российские автоматические часы для подводного плавания из классической серии Амфибия.'
  },
  {
    id: 9,
    brand: 'Citizen',
    name: 'Eco-Drive AS2031-57E',
    sku: 'AS2031-57E',
    category: 'Мужские',
    mechanism: 'Кварцевый',
    caseMaterial: 'Титан',
    color: 'Серебристый',
    price: 89900,
    oldPrice: null,
    image: 'assets/img/watches/real-10.jpg',
    description: 'Часы Citizen Eco-Drive с питанием от света, радиосинхронизацией и титановым корпусом.'
  },
  {
    id: 10,
    brand: 'Cartier',
    name: 'Tank Must 2021',
    sku: 'CAR-TANK-2021',
    category: 'Унисекс',
    mechanism: 'Кварцевый',
    caseMaterial: 'Нержавеющая сталь',
    color: 'Серебристый',
    price: 399000,
    oldPrice: 429000,
    image: 'assets/img/watches/real-11.jpg',
    description: 'Современная версия классических прямоугольных часов Cartier Tank Must.'
  }
];

const reviews = [
  { id: 1, productId: 3, author: 'Роман', model: 'Casio F-91W', rating: 5, text: 'Очень лёгкие и компактные часы — через несколько минут перестаёшь ощущать их на руке.', date: '2026-07-01' },
  { id: 2, productId: 6, author: 'Светлана', model: 'Rolex Submariner Date 16610', rating: 4, text: 'Безель поворачивается с точными щелчками, браслет удобный, размер корпуса универсальный.', date: '2026-06-29' },
  { id: 3, productId: 7, author: 'Артур', model: 'Hamilton Khaki X-Patrol', rating: 5, text: 'Корпус массивный, зато часы ощущаются основательно. Хронограф работает чётко.', date: '2026-07-04' },
  { id: 4, productId: 9, author: 'Сергей', model: 'Citizen Eco-Drive', rating: 4, text: 'Eco-Drive избавил от замены батареек: часам достаточно света, чтобы точно идти.', date: '2026-06-27' },
  { id: 5, productId: 10, author: 'Мария', model: 'Cartier Tank Must', rating: 5, text: 'Очень аккуратная модель под деловой стиль. На странице товара всё понятно и красиво.', date: '2026-07-02' }
];

const todoStorageKey = 'watchaas-todos';

const sectionIds = ['home', 'catalog', 'product', 'reviews', 'todo'];

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupCatalog();
  setupReviews();
  setupTodos();
  renderRoute();
  registerServiceWorker();
});

window.addEventListener('hashchange', renderRoute);
function setupNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-tab]').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav) nav.classList.remove('is-open');
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

function renderRoute() {
  const hash = window.location.hash.replace('#', '');

  if (hash.startsWith('product-')) {
    const id = Number(hash.replace('product-', ''));
    renderProductDetail(id);
    setActiveTab('product');
    return;
  }

  setActiveTab(sectionIds.includes(hash) ? hash : 'home');
}

function setActiveTab(tabName) {
  document.querySelectorAll('.tab-section').forEach((section) => {
    section.classList.toggle('active', section.id === tabName);
  });

  document.querySelector('.active-only-home')?.classList.toggle('is-visible', tabName === 'home');

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.classList.toggle('active', link.dataset.tab === tabName || (tabName === 'product' && link.dataset.tab === 'catalog'));
  });
}

function setupCatalog() {
  const brandFilter = document.getElementById('brandFilter');
  const brands = [...new Set(products.map((product) => product.brand))].sort();

  brands.forEach((brand) => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.append(option);
  });

  document.querySelectorAll('#catalogFilters input, #catalogFilters select').forEach((control) => {
    control.addEventListener('input', renderProducts);
  });

  document.getElementById('catalogFilters').addEventListener('reset', () => {
    setTimeout(renderProducts, 0);
  });

  renderProducts();
}

function renderProducts() {
  const query = document.getElementById('searchFilter').value.trim().toLowerCase();
  const brand = document.getElementById('brandFilter').value;
  const mechanism = document.getElementById('mechanismFilter').value;
  const minPrice = Number(document.getElementById('minPriceFilter').value) || 0;
  const maxPriceValue = Number(document.getElementById('maxPriceFilter').value);
  const maxPrice = maxPriceValue > 0 ? maxPriceValue : Infinity;
  const sort = document.getElementById('sortFilter').value;

  let list = products.filter((product) => {
    const searchText = `${product.brand} ${product.name}`.toLowerCase();
    return (!query || searchText.includes(query))
      && (!brand || product.brand === brand)
      && (!mechanism || product.mechanism === mechanism)
      && product.price >= minPrice
      && product.price <= maxPrice;
  });

  if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);

  const grid = document.getElementById('productGrid');
  document.getElementById('productCount').innerHTML = `<b>Найдено: ${list.length}</b>`;
  grid.innerHTML = '';

  if (!list.length) {
    grid.innerHTML = '<div class="empty"><h2>Ничего не найдено</h2><p>Измените параметры или сбросьте фильтры.</p></div>';
    return;
  }

  list.forEach((product) => {
    const averageRating = getProductAverageRating(product.id);
    const reviewCount = reviews.filter((review) => review.productId === product.id).length;
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <a class="product-card__link" href="#product-${product.id}" aria-label="Открыть ${escapeHtml(product.brand)} ${escapeHtml(product.name)}">
        <span class="product-card__image"><img src="${product.image}" alt="${escapeHtml(product.brand)} ${escapeHtml(product.name)}"></span>
        <div class="product-card__body">
          <small>${escapeHtml(product.brand)}</small>
          <h3>${escapeHtml(product.name)}</h3>
          <p>${escapeHtml(product.category)} · ${escapeHtml(product.mechanism)}</p>
          <div class="rating">${stars(averageRating)} <small>(${reviewCount})</small></div>
          <div class="price">${formatMoney(product.price)}${product.oldPrice ? `<del>${formatMoney(product.oldPrice)}</del>` : ''}</div>
        </div>
      </a>
    `;
    grid.append(card);
  });
}

function renderProductDetail(id) {
  const product = products.find((item) => item.id === id) || products[0];
  const productReviews = reviews.filter((review) => review.productId === product.id);
  const averageRating = getProductAverageRating(product.id);
  const detail = document.getElementById('productDetail');

  detail.innerHTML = `
    <section class="product-detail">
      <div class="product-detail__image"><img src="${product.image}" alt="${escapeHtml(product.brand)} ${escapeHtml(product.name)}"></div>
      <div>
        <span class="eyebrow">${escapeHtml(product.brand)}</span>
        <h1>${escapeHtml(product.name)}</h1>
        <p class="sku">Артикул: ${escapeHtml(product.sku)}</p>
        <div class="rating">${stars(averageRating)} ${averageRating.toFixed(1)} · ${productReviews.length} отзывов</div>
        <div class="price price--large">${formatMoney(product.price)}${product.oldPrice ? `<del>${formatMoney(product.oldPrice)}</del>` : ''}</div>
        <p>${escapeHtml(product.description)}</p>
        <h2>Характеристики</h2>
        <dl class="specs">
          <div><dt>Категория</dt><dd>${escapeHtml(product.category)}</dd></div>
          <div><dt>Механизм</dt><dd>${escapeHtml(product.mechanism)}</dd></div>
          <div><dt>Материал корпуса</dt><dd>${escapeHtml(product.caseMaterial)}</dd></div>
          <div><dt>Цвет</dt><dd>${escapeHtml(product.color)}</dd></div>
        </dl>
      </div>
    </section>
  `;
}

function setupReviews() {
  document.getElementById('reviewDateFilter').addEventListener('input', renderReviews);
  document.getElementById('reviewSort').addEventListener('input', renderReviews);
  document.getElementById('resetReviewFilter').addEventListener('click', () => {
    document.getElementById('reviewDateFilter').value = '';
    document.getElementById('reviewSort').value = 'desc';
    renderReviews();
  });
  renderReviews();
}

function renderReviews() {
  const date = document.getElementById('reviewDateFilter').value;
  const sort = document.getElementById('reviewSort').value;
  let list = [...reviews];

  if (date) list = list.filter((review) => review.date === date);
  list.sort((a, b) => sort === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

  const container = document.getElementById('reviewList');
  container.innerHTML = list.length ? list.map(renderReviewCard).join('') : '<div class="empty">Отзывов на эту дату нет.</div>';
}

function renderReviewCard(review) {
  return `
    <article class="review-card">
      <div><strong>${escapeHtml(review.author)}</strong><span class="rating">${stars(review.rating)}</span></div>
      <p><small>${escapeHtml(review.model)}</small></p>
      <p>${escapeHtml(review.text)}</p>
      <time datetime="${review.date}">${formatDate(review.date)}</time>
    </article>
  `;
}

function setupTodos() {
  document.getElementById('todoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('todoTitle').value.trim();
    const date = document.getElementById('todoDate').value;

    if (!title || !date) return;

    const todos = getTodos();
    todos.push({ id: Date.now(), title, date });
    saveTodos(todos);
    event.target.reset();
    renderTodos();
  });

  document.getElementById('todoDateFilter').addEventListener('input', renderTodos);
  document.getElementById('todoSort').addEventListener('input', renderTodos);
  renderTodos();
}

function renderTodos() {
  const date = document.getElementById('todoDateFilter').value;
  const sort = document.getElementById('todoSort').value;
  let todos = getTodos();

  if (date) todos = todos.filter((todo) => todo.date === date);
  if (sort === 'asc') todos.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sort === 'desc') todos.sort((a, b) => new Date(b.date) - new Date(a.date));

  const container = document.getElementById('todoList');
  container.innerHTML = '';

  if (!todos.length) {
    container.innerHTML = '<div class="empty">Список задач пуст</div>';
    return;
  }

  todos.forEach((todo) => {
    const card = document.createElement('article');
    card.className = 'task-card';
    card.innerHTML = `
      <div>
        <h3>${escapeHtml(todo.title)}</h3>
        <p>${formatDate(todo.date)}</p>
      </div>
      <div class="task-actions"><button class="todo-delete" type="button">Удалить</button></div>
    `;
    card.querySelector('button').addEventListener('click', () => {
      saveTodos(getTodos().filter((item) => item.id !== todo.id));
      renderTodos();
    });
    container.append(card);
  });
}

function getTodos() {
  return JSON.parse(localStorage.getItem(todoStorageKey) || '[]');
}

function saveTodos(todos) {
  localStorage.setItem(todoStorageKey, JSON.stringify(todos));
}

function getProductAverageRating(productId) {
  const productReviews = reviews.filter((review) => review.productId === productId);
  if (!productReviews.length) return 0;
  return productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
}

function stars(value) {
  const rounded = Math.round(value);
  return '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded);
}

function formatMoney(value) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

function formatDate(date) {
  const parts = date.split('-');
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => console.log('Service worker registered:', registration.scope))
      .catch((error) => console.log('Service worker registration failed:', error));
  });
}