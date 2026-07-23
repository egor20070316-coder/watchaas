let currentUser = null;

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

let currentMode = 'login';

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

form.addEventListener('submit', function(e) {
    e.preventDefault();
    hideMessages();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showError('Пожалуйста, заполните все поля');
        return;
    }

    if (password.length < 6) {
        showError('Пароль должен содержать минимум 6 символов');
        return;
    }

    if (currentMode === 'login') {
        const user = DB.authenticate(email, password);
        
        if (user) {
            currentUser = user;
            showSuccess(`Добро пожаловать, ${user.name}! 🎉`);
            
            localStorage.setItem('watchaas_current_user', JSON.stringify(user));
            
            // Перенаправляем на главную через 1 секунду
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showError('Неверный email или пароль. Попробуйте снова.');
        }
    }

    else {
        const name = fullnameInput.value.trim();
        
        if (!name) {
            showError('Пожалуйста, введите ваше имя');
            return;
        }

        const result = DB.register(name, email, password);
        
        if (result.success) {
            showSuccess(`Аккаунт создан! Добро пожаловать, ${name}! 🎉`);
            
            fullnameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            
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

switchLink.addEventListener('click', function(e) {
    e.preventDefault();
    hideMessages();
    
    if (currentMode === 'login') {
        switchMode('register');
    } else {
        switchMode('login');
    }
});

function checkSession() {
    const savedUser = localStorage.getItem('watchaas_current_user');
    
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            
            const userInDB = DB.findByEmail(currentUser.email);
            
            if (userInDB) {
                currentUser = userInDB;
                showSuccess(`Вы уже вошли как ${currentUser.name}`);
                
                // Перенаправляем на главную через 1.5 секунды
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
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

function getCurrentUser() {
    return currentUser;
}

checkSession();

// Устанавливаем режим по умолчанию
switchMode('login');

console.log('🔐 auth.js загружен');
