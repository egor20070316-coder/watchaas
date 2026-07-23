// ============================================================
// auth.js — логика регистрации, входа и выхода
// ============================================================

// Текущий пользователь (сессия)
let currentUser = null;

// ============================================================
// Получение элементов DOM
// ============================================================
const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');
const submitBtn = document.getElementById('submit-btn');
const switchLink = document.getElementById('switch-link');
const switchText = document.getElementById('switch-text');
const nameField = document.getElementById('name-field');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

// Режим: 'login' или 'register'
let currentMode = 'login';

// ============================================================
// Переключение между входом и регистрацией
// ============================================================
function switchMode(mode) {
    currentMode = mode;

    if (mode === 'login') {
        formTitle.textContent = 'Вход';
        formSubtitle.textContent = 'Войдите в свой аккаунт, чтобы продолжить';
        submitBtn.textContent = 'Войти';
        switchText.textContent = 'Нет аккаунта?';
        switchLink.textContent = 'Зарегистрироваться';
        nameField.classList.add('hidden');
        fullnameInput.removeAttribute('required');
        passwordInput.setAttribute('autocomplete', 'current-password');
    } else {
        formTitle.textContent = 'Регистрация';
        formSubtitle.textContent = 'Создайте аккаунт, чтобы пользоваться всеми функциями';
        submitBtn.textContent = 'Зарегистрироваться';
        switchText.textContent = 'Уже есть аккаунт?';
        switchLink.textContent = 'Войти';
        nameField.classList.remove('hidden');
        fullnameInput.setAttribute('required', 'required');
        passwordInput.setAttribute('autocomplete', 'new-password');
    }

    hideMessages();
}

// ============================================================
// Показать/скрыть сообщения
// ============================================================
function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
}

function showSuccess(msg) {
    successMsg.textContent = msg;
    successMsg.style.display = 'block';
    errorMsg.style.display = 'none';
}

function hideMessages() {
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';
}

// ============================================================
// Обработка отправки формы
// ============================================================
form.addEventListener('submit', function(e) {
    e.preventDefault();
    hideMessages();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Проверка на пустые поля
    if (!email || !password) {
        showError('Пожалуйста, заполните все поля');
        return;
    }

    // Проверка длины пароля
    if (password.length < 6) {
        showError('Пароль должен содержать минимум 6 символов');
        return;
    }

    // ===== ВХОД =====
    if (currentMode === 'login') {
        const user = DB.authenticate(email, password);
        
        if (user) {
            currentUser = user;
            showSuccess(`Добро пожаловать, ${user.name}! 🎉`);
            
            // Сохраняем сессию
            localStorage.setItem('watchaas_current_user', JSON.stringify(user));
            
            // Перенаправляем на главную через 1 секунду
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showError('Неверный email или пароль. Попробуйте снова.');
        }
    }

    // ===== РЕГИСТРАЦИЯ =====
    else {
        const name = fullnameInput.value.trim();
        
        if (!name) {
            showError('Пожалуйста, введите ваше имя');
            return;
        }

        const result = DB.register(name, email, password);
        
        if (result.success) {
            showSuccess(`Аккаунт создан! Добро пожаловать, ${name}! 🎉`);
            
            // Очищаем поля
            fullnameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            
            // Переключаемся на вход через 1.5 секунды
            setTimeout(() => {
                switchMode('login');
                hideMessages();
                emailInput.value = email;
                showSuccess('Теперь вы можете войти в свой аккаунт!');
            }, 1500);
        } else {
            showError(result.error);
        }
    }
});

// ============================================================
// Переключение режима при клике на ссылку
// ============================================================
switchLink.addEventListener('click', function(e) {
    e.preventDefault();
    hideMessages();
    
    if (currentMode === 'login') {
        switchMode('register');
    } else {
        switchMode('login');
    }
});

// ============================================================
// Проверка сессии при загрузке страницы
// ============================================================
function checkSession() {
    const savedUser = localStorage.getItem('watchaas_current_user');
    
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            
            // Проверяем, существует ли пользователь в БД
            const userInDB = DB.findByEmail(currentUser.email);
            
            if (userInDB) {
                currentUser = userInDB;
                // Если пользователь уже залогинен — НЕ ПЕРЕНАПРАВЛЯЕМ на главную
                // Просто показываем сообщение
                showSuccess(`Вы уже вошли как ${currentUser.name}`);
                // Меняем кнопку "Войти" на "Выйти"
                const submitBtn = document.getElementById('submit-btn');
                submitBtn.textContent = 'Выйти';
                submitBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    logout();
                });
            } else {
                // Пользователь удалён из БД — очищаем сессию
                localStorage.removeItem('watchaas_current_user');
                currentUser = null;
            }
        } catch {
            localStorage.removeItem('watchaas_current_user');
            currentUser = null;
        }
    }
}

function logout() {
    localStorage.removeItem('watchaas_current_user');
    currentUser = null;
    window.location.href = 'login.html';
}

// ============================================================
// Получить текущего пользователя (для других скриптов)
// ============================================================
function getCurrentUser() {
    return currentUser;
}

// ============================================================
// Инициализация
// ============================================================
// Проверяем сессию
checkSession();

// Устанавливаем режим по умолчанию
switchMode('login');

console.log('🔐 auth.js загружен');
