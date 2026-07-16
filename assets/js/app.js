const products = [
  ['Casio', 'G-Shock GA-2100-1A1ER', 'Мужские', 'Кварцевый', 13990, 'assets/img/watches/real-01.jpg'],
  ['Tissot', 'PRX Quartz 40', 'Унисекс', 'Кварцевый', 54900, 'assets/img/watches/real-02.jpg'],
  ['Casio', 'F-91W', 'Унисекс', 'Электронный', 3490, 'assets/img/watches/real-03.jpg'],
  ['Seiko', 'SKX007', 'Мужские', 'Механический', 52990, 'assets/img/watches/real-04.jpg'],
  ['Omega', 'Speedmaster Professional', 'Мужские', 'Механический', 849900, 'assets/img/watches/real-05.jpg'],
  ['Rolex', 'Submariner Date 16610', 'Мужские', 'Механический', 1290000, 'assets/img/watches/real-06.jpg'],
  ['Hamilton', 'Khaki X-Patrol H76566151', 'Мужские', 'Механический', 169900, 'assets/img/watches/real-08.jpg'],
  ['Восток', 'Амфибия 090916', 'Мужские', 'Механический', 12990, 'assets/img/watches/real-09.jpg'],
  ['Citizen', 'Eco-Drive AS2031-57E', 'Мужские', 'Кварцевый', 89900, 'assets/img/watches/real-10.jpg'],
  ['Cartier', 'Tank Must 2021', 'Унисекс', 'Кварцевый', 399000, 'assets/img/watches/real-11.jpg']
].map((item, index) => ({
  id: index + 1,
  brand: item[0],
  name: item[1],
  category: item[2],
  mechanism: item[3],
  price: item[4],
  image: item[5]
}));

const reviews = [
  ['Роман', 'Casio F-91W', 'Очень легкие и компактные часы, отличный вариант на каждый день.', '2026-07-01'],
  ['Светлана', 'Rolex Submariner Date 16610', 'Браслет удобный, корпус выглядит универсально и строго.', '2026-06-29'],
  ['Артур', 'Hamilton Khaki X-Patrol', 'Корпус массивный, хронограф работает четко и без задержек.', '2026-07-04'],
  ['Сергей', 'Citizen Eco-Drive', 'Eco-Drive избавил от замены батареек, заряд держится отлично.', '2026-06-27'],
  ['Максим', 'Swatch GB101', 'Почти невесомые часы с узнаваемым дизайном Swatch.', '2026-07-02']
].map((item, index) => ({
  id: index + 1,
  author: item[0],
  model: item[1],
  text: item[2],
  date: item[3]
}));

const todoStorageKey = 'watchaas-github-todos';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupCatalog();
  setupReviews();
  setupTodos();
  registerServiceWorker();
});

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
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveTab(link.dataset.tab);
      window.location.hash = link.dataset.tab;
    });
  });

  setActiveTab(window.location.hash.replace('#', '') || 'home');
}

function setActiveTab(tabName) {
  document.querySelectorAll('.tab-section').forEach((section) => {
    section.classList.toggle('active', section.id === tabName);
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.classList.toggle('active', link.dataset.tab === tabName);
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

  renderProducts();
}

function renderProducts() {
  const brand = document.getElementById('brandFilter').value;
  const mechanism = document.getElementById('mechanismFilter').value;
  const minPrice = Number(document.getElementById('minPriceFilter').value) || 0;
  const maxPriceValue = Number(document.getElementById('maxPriceFilter').value);
  const maxPrice = maxPriceValue > 0 ? maxPriceValue : Infinity;
  const sort = document.getElementById('sortFilter').value;

  let list = products.filter((product) => {
    return (!brand || product.brand === brand)
      && (!mechanism || product.mechanism === mechanism)
      && product.price >= minPrice
      && product.price <= maxPrice;
  });

  if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);

  const grid = document.getElementById('productGrid');
  document.getElementById('productCount').textContent = `Найдено: ${list.length}`;
  grid.innerHTML = '';

  if (!list.length) {
    grid.innerHTML = '<div class="empty">Ничего не найдено</div>';
    return;
  }

  list.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.brand} ${product.name}">
      <div class="product-card__body">
        <small>${product.brand}</small>
        <h3>${product.name}</h3>
        <p>${product.category} · ${product.mechanism}</p>
        <div class="price">${formatMoney(product.price)}</div>
      </div>
    `;
    grid.append(card);
  });
}

function setupReviews() {
  document.getElementById('reviewDateFilter').addEventListener('input', renderReviews);
  document.getElementById('reviewSort').addEventListener('input', renderReviews);
  renderReviews();
}

function renderReviews() {
  const date = document.getElementById('reviewDateFilter').value;
  const sort = document.getElementById('reviewSort').value;
  let list = [...reviews];

  if (date) list = list.filter((review) => review.date === date);
  list.sort((a, b) => sort === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

  const container = document.getElementById('reviewList');
  container.innerHTML = '';

  if (!list.length) {
    container.innerHTML = '<div class="empty">Отзывов на эту дату нет</div>';
    return;
  }

  list.forEach((review) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="card-head">
        <h3>${review.author}</h3>
        <span class="card-date">${formatDate(review.date)}</span>
      </div>
      <p><b>${review.model}</b></p>
      <p>${review.text}</p>
    `;
    container.append(card);
  });
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
    card.className = 'todo-card';
    card.innerHTML = `
      <div class="card-head">
        <div>
          <h3>${todo.title}</h3>
          <p>${formatDate(todo.date)}</p>
        </div>
        <button class="todo-delete" type="button">Удалить</button>
      </div>
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

function formatMoney(value) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

function formatDate(date) {
  const parts = date.split('-');
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => console.log('Service worker registered:', registration.scope))
      .catch((error) => console.log('Service worker registration failed:', error));
  });
}
