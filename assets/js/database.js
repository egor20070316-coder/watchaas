const DB = {
    // Ключ для хранения в localStorage
    STORAGE_KEY: 'watchaas_users',

    getUsers() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    saveUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },

    findByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },

    authenticate(email, password) {
        const users = this.getUsers();
        return users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );
    },

    register(name, email, password) {
        // Проверяем, существует ли уже такой email
        if (this.findByEmail(email)) {
            return { 
                success: false, 
                error: 'Пользователь с таким email уже существует' 
            };
        }

        const users = this.getUsers();
        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);

        return { 
            success: true, 
            user: newUser 
        };
    },

   
    count() {
        return this.getUsers().length;
    },

    // --------------------------------------------------------
    // Получить всех пользователей для экспорта в Excel
    // --------------------------------------------------------
    exportToArray() {
        const users = this.getUsers();
        return users.map(u => ({
            'ID': u.id,
            'Имя': u.name,
            'Email': u.email,
            'Дата регистрации': new Date(u.createdAt).toLocaleString('ru-RU')
        }));
    },

  
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    deleteUser(id) {
        let users = this.getUsers();
        users = users.filter(u => u.id !== id);
        this.saveUsers(users);
    },

    updateUser(id, newData) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return false;
        
        users[index] = { ...users[index], ...newData };
        this.saveUsers(users);
        return true;
    }
};

console.log('📦 database.js загружен');
console.log('📊 Пользователей в БД:', DB.count());
